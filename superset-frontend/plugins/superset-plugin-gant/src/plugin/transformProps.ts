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
import { ChartProps, TimeseriesDataRecord } from '@superset-ui/core';
import { Color } from '@amcharts/amcharts5';
import { useMemo } from 'react';
import { Category } from '../types';
import { object } from 'prop-types';
import { forEach, result } from 'lodash';

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

  const { onContextMenu, setDataMask } = hooks;

  const {
    boldText,
    headerFontSize,
    headerText,
    startDate,
    endDate,
    cols,
    grane,
    template,
    mainColor,
    customize,
    condition,
  } = formData;
  const data = queriesData[0].data as TimeseriesDataRecord[];

  const categories: Set<Category> = Object.assign([
    ...Array.from(new Set(data.map(name => name[cols])), v => ({
      category: v,
    })),
  ]);

  let start = '';
  let end = '';

  if (typeof startDate === 'object') {
    start = startDate.label;
  } else {
    start = startDate;
  }

  if (typeof endDate === 'object') {
    end = endDate.label;
  } else {
    end = endDate;
  }

  var operators = {
    ">": function(a: number | string, b: number | string) { return a > b; },
    "<": function(a: number | string, b: number | string) { return a < b; },
    "=": function(a: number | string, b: number | string) { return a = b; },
  };

  function cond(d, cond, mainColor) {
    let resultColor = Color.fromRGB(mainColor.r, mainColor.g, mainColor.b);
    const l = cond.forEach(c => {
      const { column, operator, targetValue, colorScheme } = c;
      
      var operatorFunction = operators[operator];
      if (operatorFunction) {
        var result = operatorFunction(d[column], targetValue);
        if result {
          resultColor =  Color.fromRGB(colorScheme.r, colorScheme.g, colorScheme.b)
        }
      }

    });

    return resultColor;
  }

  const dataChart = data.map(v => ({
    category: v[cols],
    // @ts-ignore
    start: new Date(v[start]).getTime(),
    // @ts-ignore
    end: new Date(v[end]).getTime(),
    ...v,
    columnSettings: {
      fill:
        Array.isArray(condition) && condition.length > 0
          ? cond(v, condition, mainColor)
          : Color.fromRGB(mainColor.r, mainColor.g, mainColor.b),
    },
  }));

  return {
    width,
    height,
    data,
    startDate,
    endDate,
    cols,
    boldText,
    headerFontSize,
    headerText,
    grane,
    template,
    filterState,
    emitCrossFilters,
    onContextMenu,
    setDataMask,
    mainColor,
    categories,
    dataChart,
    customize,
  };
}
