
import {
  format as d3Format,
} from 'd3-format';
import NumberFormatter from '../NumberFormatter';
import NumberFormats from '../NumberFormats';

// Хранилище данных для вычисления максимального масштаба для всех графиков
// У каждого графика будет свой уникальный масштаб на основе его значений
const chartScales = new Map<string, { name: string; divider: number }>();

// Глобальное хранилище значений для текущего графика
const chartValues: number[] = [];
let currentChartId = '';
let pendingScaleUpdate = true;
// Храним максимальное значение для текущего графика, чтобы отслеживать изменения
let currentMaxValue = 0;
// Порог для сброса масштаба (если максимальное значение уменьшилось в 1000 раз)
const SCALE_RESET_THRESHOLD = 1000;

// Определение масштабов и их порядков
const SCALES = [
  { name: 'трлн', threshold: 1e12, divider: 1e12 },
  { name: 'млрд', threshold: 1e9, divider: 1e9 },
  { name: 'млн', threshold: 1e6, divider: 1e6 },
  { name: 'тыс', threshold: 1e3, divider: 1e3 },
  { name: '', threshold: 0, divider: 1 },
];

// Форматтер с 2 десятичными знаками
const float2PointFormatter = d3Format('.2~f');
// Форматтер для больших чисел без десятичных знаков
const intFormatter = d3Format(',d');
// Форматтер для очень малых чисел.
// Стремимся вывести достаточное количество знаков после запятой,
// чтобы ненулевые значения не округлялись до 0.
function formatSmallNumber(value: number): string {
  // Идём от 6 до 12 знаков после запятой, пока результат не станет ненулевым.
  for (let decimals = 6; decimals <= 12; decimals += 1) {
    const fmt = d3Format(`.${decimals}f`)(value);
    if (parseFloat(fmt) !== 0) {
      // Убираем незначащие нули и лишнюю точку на конце
      return fmt.replace(/\.0+$/, '').replace(/\.$/, '');
    }
  }
  // Если даже при 12 знаках после запятой получилось 0, возвращаем экспоненциальную запись
  return d3Format('.2e')(value);
}

// Форматтер для целых чисел с разделителями тысяч
const integerFormatter = d3Format(NumberFormats.INTEGER);

/**
 * Определяет масштаб на основе значения
 */
function getScale(value: number) {
  // Берем абсолютное значение
  const absValue = Math.abs(value);
  
  // Проверяем от большего к меньшему
  if (absValue >= SCALES[0].threshold) {
    return SCALES[0]; // трлн
  } else if (absValue >= SCALES[1].threshold) {
    return SCALES[1]; // млрд
  } else if (absValue >= SCALES[2].threshold) {
    return SCALES[2]; // млн
  } else if (absValue >= SCALES[3].threshold) {
    return SCALES[3]; // тыс
  } else {
    return SCALES[4]; // без суффикса
  }
}

/**
 * Сброс кеша значений и масштаба
 * Вызывать перед рендерингом нового графика
 */
export function resetMaxScale() {
  chartValues.length = 0;
  pendingScaleUpdate = true;
  currentMaxValue = 0;
  // Генерируем новый ID для графика, чтобы обеспечить уникальность кеша
  currentChartId = `chart_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Вычисляет максимальный масштаб на основе собранных значений
 */
function calculateMaxScale() {
  if (chartValues.length === 0) return null;

  // Находим максимальное абсолютное значение
  const maxValue = Math.max(...chartValues.map(v => 
    typeof v === 'number' && !Number.isNaN(v) && isFinite(v) ? Math.abs(v) : 0
  ));
  
  // Проверяем, не уменьшились ли значения значительно
  if (currentMaxValue > 0 && maxValue > 0 && currentMaxValue / maxValue > SCALE_RESET_THRESHOLD) {
    // Если максимальное значение уменьшилось более чем в 1000 раз, сбрасываем масштаб
    chartScales.delete(currentChartId);
  }
  
  // Обновляем текущее максимальное значение
  currentMaxValue = maxValue;
  
  if (maxValue > 0) {
    const scale = getScale(maxValue);
    // Сохраняем максимальный масштаб для текущего графика
    chartScales.set(currentChartId, scale);
    return scale;
  }
  
  return null;
}

/**
 * Создает форматтер, который автоматически определяет максимальный масштаб
 * в наборе данных и приводит все значения к этому масштабу.
 * Например, если максимальное значение в млрд, то все значения отображаются в млрд.
 */
export default function createMaxScaleNumberFormatter(
  config: {
    description?: string;
    id?: string;
    label?: string;
  } = {},
) {
  const { description, id, label } = config;
  
  return new NumberFormatter({
    description,
    formatFunc: value => {
      if (value === 0) {
        return '0';
      }
      
      // Добавляем значение в кеш для последующего расчета максимального масштаба
      if (typeof value === 'number' && !Number.isNaN(value) && isFinite(value)) {
        chartValues.push(value);
        pendingScaleUpdate = true;
      }
      
      // Пересчитываем масштаб при каждом обновлении данных
      if (pendingScaleUpdate) {
        calculateMaxScale();
        pendingScaleUpdate = false;
      }
      
      // Получаем сохраненный масштаб для текущего графика или определяем для текущего значения
      const maxScale = chartScales.get(currentChartId) || getScale(value);
      
      // Делим значение на делитель масштаба
      const scaledValue = value / maxScale.divider;
      
      // Форматируем в зависимости от значения
      let formattedValue;
      if (Math.abs(scaledValue) >= 1000) {
        // Для больших чисел используем целочисленный формат
        formattedValue = integerFormatter(scaledValue);
      } else if (Math.abs(scaledValue) < 0.01 && scaledValue !== 0) {
        // Для очень малых значений используем динамический форматтер,
        // который увеличивает количество знаков до тех пор, пока число не станет отличным от 0.
        formattedValue = formatSmallNumber(scaledValue);
        return maxScale.name ? `${formattedValue} ${maxScale.name}` : formattedValue;
      } else if (Number.isInteger(scaledValue)) {
        // Для целых чисел используем целочисленный формат
        formattedValue = integerFormatter(scaledValue);
      } else {
        // Для чисел с дробной частью используем формат с двумя знаками
        formattedValue = float2PointFormatter(scaledValue);
      }
      
      return maxScale.name ? `${formattedValue} ${maxScale.name}` : formattedValue;
    },
    id: id ?? NumberFormats.MAX_SCALE,
    label: label ?? 'Новый масштаб',
  });
} 