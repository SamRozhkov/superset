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
  QueryFormData,
  supersetTheme,
  TimeseriesDataRecord,
  SetDataMaskHook,
  HandlerFunction,
  FilterState,
} from '@superset-ui/core';

export interface SupersetPluginGantStylesProps {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
}

interface SupersetPluginGantCustomizeProps {
  headerText: string;
}

export type CrossFilterTransformedProps = {
  setControlValue?: HandlerFunction;
  setDataMask: SetDataMaskHook;
  selectedValues: Record<number, string>;
  emitCrossFilters?: boolean;
  filterState: FilterState;
  onContextMenu: HandlerFunction;
};

export type SupersetPluginGantQueryFormData = QueryFormData &
  SupersetPluginGantStylesProps &
  SupersetPluginGantCustomizeProps;

export type SupersetPluginGantProps = SupersetPluginGantStylesProps &
  SupersetPluginGantCustomizeProps &
  CrossFilterTransformedProps & {
    data: TimeseriesDataRecord[];
    cols: string;
    startDate: any;
    endDate: any;
    grane: any;
    template: string;
    mainColor: any;
    categories: any;
    dataChart: any;
    customize: string;
    oversizedBehavior?:
      | 'none'
      | 'hide'
      | 'fit'
      | 'wrap'
      | 'wrap-no-break'
      | 'truncate'
      | undefined;
    maxWidth?: number;
    dateFormat: string;
    attribute: string;
    condition: any;
    // add typing here for the props you pass in from transformProps.ts!
  };

export type Category = String[];

export const D3_TIME_FORMAT_OPTIONS_AMCHART: [string, string][] = [
  ['dd.MM.yyyy', 'dd.MM.yyyy | 14.01.2019'],
  ['dd.MM.yyyy H:m:s', 'dd.MM.yyyy H:m:s | 14-01-2019 01:32:10'],
  ['dd/MM/yyyy', 'dd/MM/yyyy | 14/01/2019'],
  ['MM/dd/yyyy', 'MM/dd/yyyy | 01/14/2019'],
  ['yyyy-MM-dd', 'yyyy-MM-dd | 2019-01-14'],
  ['yyyy-MM-dd H:m:s', 'yyyy-MM-dd H:m:s | 2019-01-14 01:32:10'],
  ['dd-MM-yyyy H:m:s', 'dd-MM-yyyy H:m:s | 14-01-2019 01:32:10'],
  ['H:m:s', 'H:m:s | 01:32:10'],
];

export const DEFAULT_TIME_FORMAT_AMCHART = D3_TIME_FORMAT_OPTIONS_AMCHART[0][0];
