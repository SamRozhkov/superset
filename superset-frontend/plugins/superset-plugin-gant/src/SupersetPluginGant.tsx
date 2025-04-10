/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { styled } from '@superset-ui/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5locales_ru_RU from '@amcharts/amcharts5/locales/ru_RU';
import { ColumnSeries, XYChart } from '@amcharts/amcharts5/xy';
import {
  Category,
  SupersetPluginGantProps,
  SupersetPluginGantStylesProps,
} from './types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Styles = styled.div<SupersetPluginGantStylesProps>`
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  h3 {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) =>
      theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) =>
      theme.typography.weights[boldText ? 'bold' : 'normal']};
  }

  pre {
    height: ${({ theme, headerFontSize, height }) =>
      height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]}px;
  }
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function SupersetPluginGant(props: SupersetPluginGantProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const {
    height,
    width,
    cols,
    template,
    emitCrossFilters,
    setDataMask,
    onContextMenu,
    categories,
    dataChart,
    rootElem,
  } = props;

  const chartRef = useRef<XYChart>();
  const yAxesRef = useRef<am5xy.CategoryAxis<am5xy.AxisRenderer>>();
  const seriesRef = useRef<ColumnSeries>();
  const previousSelection = useRef<am5xy.AxisLabel>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selection, setSelection] = useState<am5xy.AxisLabel | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [category, setCategory] = useState<Set<Category> | null>(categories);
  const [data, setData] = useState<any>(dataChart);

  if (data !== dataChart) setData(dataChart);

  const handleClick = (source, selectedCategory) => {
    if (!emitCrossFilters) {
      return;
    }
    //getCrossFilterDataMask(source);

    const dataMask = getCrossFilterDataMask(source, selectedCategory)?.dataMask;
    if (dataMask) {
      setDataMask(dataMask);
    }
  };

  const handleContextMenu = source => {

    //const pointerEvent = source.originalEvent;
    //pointerEvent.preventDefault();

    const key = source.target.dataItem?.uid;
    const category = source.target.dataItem?.dataContext?.category;

    let drillToDetailFilters;
    let drillByFilters;
    if (category) {
      drillToDetailFilters = [
        {
          col: cols,
          op: '==',
          category,
          formattedVal: category,
        },
      ];
      drillByFilters = [
        {
          col: cols,
          op: '==',
          category,
        },
      ];
    }
    onContextMenu(source.clientX, source.clientY, {
      drillToDetail: drillToDetailFilters,
      crossFilter: getCrossFilterDataMask(source),
      drillBy: { filters: drillByFilters, groupbyFieldName: 'cols' },
    });
  };

  const getCrossFilterDataMask = (source, selectedCategory) => {
    //const selected = Object.values(filterState.selectedValues || {});
    
    //const key = source.target.dataItem?.uid;
    const category = source.target.dataItem?.dataContext?.category;

    if (!category) {
      return undefined;
    }

    let values: any[] = [];

    if (
      previousSelection.current?.dataItem?.dataContext?.category === category
    ) {
      previousSelection.current = undefined;
    } else {
      previousSelection.current = selectedCategory;
      values = [category];
    }

    return {
      dataMask: {
        extraFormData: {
          filters: values.length
            ? [
                {
                  col: cols,
                  op: 'IN',
                  val: values,
                },
              ]
            : [],
        },
        filterState: {
          value: values.length ? category : null,
          selectedValues: values.length ? values : null,
        },
      },
      isCurrentValueSelected: true,
    };
  };

  useEffect(() => {
    yAxesRef?.current?.data.setAll(category);
  }, [category]);

  useEffect(() => {
    seriesRef?.current?.data.setAll(data);
  }, [data]);

  useEffect(() => {
    seriesRef?.current?.columns.template.set('tooltipText', template);
  }, [template]);

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useLayoutEffect(() => {
    const root = rootElem.current as HTMLElement;
    const gant_chart = am5.Root.new(root);
    gant_chart.locale = am5locales_ru_RU;
    gant_chart.dateFormatter.setAll({
      dateFormat: 'yyyy-MM-dd',
      dateFields: ['start', 'end'],
    });

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    gant_chart.setThemes([am5themes_Animated.new(gant_chart)]);
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = gant_chart.container.children.push(
      am5xy.XYChart.new(gant_chart, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'none',
        paddingLeft: 0,
        layout: gant_chart.verticalLayout,
      }),
    );
    chart.zoomOutButton.set('forceHidden', true);

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    // @ts-ignore
    chart.children.push(
      am5.Legend.new(gant_chart, {
        centerX: am5.p50,
        x: am5.p50,
      }),
    );

    const colors = chart.get('colors');
    const arrCategory = [...categories];

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

    const yRenderer = am5xy.AxisRendererY.new(gant_chart, {
      minorGridEnabled: true,
      minorLabelsEnabled: true,
      nonScalingStroke: false,
      minHeight: 20,
      minGridDistance: 20,
    });

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(gant_chart, {
        categoryField: 'category',
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(gant_chart, {}),
        interactive: true,
      }),
    );

    yRenderer.labels.template.setup = target => {
      target.setAll({
        cursorOverStyle: "pointer",
        background: am5.Rectangle.new(gant_chart, {
          fill: am5.color(0x000000),
          fillOpacity: 0,
        }),
      });
    };

    yRenderer.labels.template.events.on('click', ev => {
      setSelection(selection => {
        if (selection !== ev.target) {
          ev.target.states.apply('active');
          selection?.states.apply('default');

          return ev.target;
        }

        selection?.states.apply('default');
        return null;
      });

      const selectedCategory = ev.target;
      handleClick(ev, selectedCategory);
    });

    yRenderer.labels.template.states.create('active', {
      fontWeight: 'bold',
    });

    // @ts-ignore
    yAxis.data.setAll(category);
    // @ts-ignore
    yAxis.zoomToIndexes(category.length, category.length - 10);
    yAxesRef.current = yAxis;

    const xRenderer = am5xy.AxisRendererX.new(gant_chart, {
      strokeOpacity: 0.1,
      minorGridEnabled: false,
      minGridDistance: 80,
      minorLabelsEnabled: false,
    });

    xRenderer.labels.template.set('fontSize', '.8em');

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(gant_chart, {
        baseInterval: { timeUnit: 'day', count: 1 },
        renderer: xRenderer,
      }),
    );
    xAxis.get('dateFormats')['day'] = 'dd';
    xAxis.get('periodChangeDateFormats')['month'] = 'MMM';

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series: ColumnSeries = chart.series.push(
      am5xy.ColumnSeries.new(gant_chart, {
        xAxis,
        yAxis,
        openValueXField: 'start',
        valueXField: 'end',
        categoryYField: 'category',
        sequencedInterpolation: true,
      }),
    );

    series.columns.template.setAll({
      templateField: 'columnSettings',
      strokeOpacity: 0,
      tooltipText: template,
      interactive: true,
    });

    const linePattern = am5.LinePattern.new(gant_chart, {
      color: am5.color(0xffffff),
      colorOpacity: 0.5,
      rotation: 45,
      width: 200,
      height: 200,
    });

    series.columns.template.states.create('hover', {
      fillPattern: linePattern,
    });
    series.columns.template.states.create('hoverActive', {});
    series.columns.template.states.create('active', {});

    series.columns.events.on('rightclick', ev => {
      console.log(ev);
      handleContextMenu(ev);
    });

    series.data.setAll(data);
    seriesRef.current = series;

    // Add scrollbars
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(gant_chart, { orientation: 'horizontal' }),
    );
    chart.set(
      'scrollbarY',
      am5.Scrollbar.new(gant_chart, { orientation: 'vertical' }),
    );
    const scrollY = chart.get('scrollbarY');

    // Disable grip for Y scroll
    // @ts-ignore
    scrollY.startGrip.setAll({
      visible: false,
      x: 100,
    });

    // @ts-ignore
    scrollY.endGrip.setAll({
      visible: false,
      dy: 100,
    });

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear();
    chartRef.current = chart;

    gant_chart.addDisposer(
      am5.utils.addEventListener(gant_chart.dom, 'contextmenu', function (ev) {
        ev.preventDefault();
      }),
    );

    return () => {
      gant_chart.dispose();
    };
  }, []);

  return <div ref={rootElem} style={{ width, height }} />;
}
