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
import {
  CategoricalColorNamespace,
  ChartProps,
  TimeseriesDataRecord,
} from '@superset-ui/core';
import { Color } from '@amcharts/amcharts5';

export default function transformProps(chartProps: ChartProps) {
  /**
   * This function is called after a successful response has been
   * received from the chart data endpoint, and is used to transform
   * the incoming data prior to being sent to the Visualization.
   *
   * The transformProps function is also quite useful to return
   * additional/modified props to your data viz component. The formData
   * can also be accessed from your SupersetPluginGant.tsx file, but
   * doing supplying custom props here is often handy for integrating third
   * party libraries that rely on specific props.
   *
   * A description of properties in `chartProps`:
   * - `height`, `width`: the height/width of the DOM element in which
   *   the chart is located
   * - `formData`: the chart data request payload that was sent to the
   *   backend.
   * - `queriesData`: the chart data response payload that was received
   *   from the backend. Some notable properties of `queriesData`:
   *   - `data`: an array with data, each row with an object mapping
   *     the column/alias to its value. Example:
   *     `[{ col1: 'abc', metric1: 10 }, { col1: 'xyz', metric1: 20 }]`
   *   - `rowcount`: the number of rows in `data`
   *   - `query`: the query that was issued.
   *
   * Please note: the transformProps function gets cached when the
   * application loads. When making changes to the `transformProps`
   * function during development with hot reloading, changes won't
   * be seen until restarting the development server.
   */
  const {
    width,
    height,
    formData,
    queriesData,
    filterState,
    emitCrossFilters,
    hooks,
  } = chartProps;

  const { onContextMenu, setDataMask = () => {} } = hooks;

  const {
    startDate,
    endDate,
    cols,
    //mainColor,
    condition,
    oversizedBehavior,
    maxWidth,
    sharedLabelColors,
    dateFormat,
    colorScheme,
    attribute,
  } = formData;

  const data = queriesData[0].data as TimeseriesDataRecord[];

  const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);

  //const { selectedValues } = filterState;

  const template = formData?.template
    ?.replaceAll('\\n', '\n')
    .replaceAll('\\t', '\t');

  const categories = [
    ...Array.from(new Set(data.map(name => name[cols])), v => ({
      category: v,
      columnSettings: {
        fontWeight: filterState.selectedValues?.includes(v) ? 'bold' : 'normal',
      },
    })),
  ];

  const start = startDate instanceof Object ? startDate.label : startDate;
  const end = endDate instanceof Object ? endDate.label : endDate;

  const operators = {
    '>': function (a: number, b: number) {
      return a > b;
    },
    '<': function (a: number, b: number) {
      return a < b;
    },
    '=': function (a: number, b: number) {
      return a === b;
    },
    '≥': function (a: number, b: number) {
      return a >= b;
    },
    '≤': function (a: number, b: number) {
      return a <= b;
    },
    '≠': function (a: number, b: number) {
      return a !== b;
    },
    '< x ≤': function (a: number, b: number, c: number) {
      return b < a && a <= c;
    },
    '< x <': function (a: number, b: number, c: number) {
      return b < a && a < c;
    },
    '≤ x ≤': function (a: number, b: number, c: number) {
      return b <= a && a <= c;
    },
    '≤ x <': function (a: number, b: number, c: number) {
      return b <= a && a < c;
    },
  };

  function cond(d, cond) {
    let resultColor = colorFn(d[attribute], d[attribute]);
    cond.forEach(c => {
      const {
        column,
        operator,
        targetValue,
        colorScheme,
        targetValueLeft,
        targetValueRight,
      } = c;

      const operatorFunction = operators[operator];
      if (operatorFunction) {
        const result =
          targetValue !== undefined
            ? operatorFunction(d[column], targetValue)
            : operatorFunction(d[column], targetValueLeft, targetValueRight);
        if (result) {
          resultColor = Color.fromRGB(
            colorScheme.r,
            colorScheme.g,
            colorScheme.b,
          );
        }
      }
    });

    return resultColor;
  }

  const dataChart = data.map(v => ({
    categoryField: v[cols],
    // @ts-ignore
    fromDate: new Date(v[start]).getTime(),
    // @ts-ignore
    toDate: new Date(v[end]).getTime(),
    ...v,
    columnSettings: {
      fill:
        Array.isArray(condition) && condition.length > 0
          ? cond(v, condition)
          : colorFn(v[attribute], v[attribute]),
      opacity:
        filterState.selectedValues && !filterState.selectedValues.includes(v[cols])
          ? 0.3
          : 1,
    },
  }));

  return {
    height,
    width,
    cols,
    template,
    emitCrossFilters,
    setDataMask,
    onContextMenu,
    categories,
    dataChart,
    oversizedBehavior,
    maxWidth,
    sharedLabelColors,
    dateFormat,
    attribute,
    condition,
  };
}
