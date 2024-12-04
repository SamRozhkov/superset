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
import { array } from '@amcharts/amcharts5';
import {
  QueryFormData,
  supersetTheme,
  TimeseriesDataRecord,
  QueryFormColumn,
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
  groupby: QueryFormColumn[];
  labelMap: Record<string, string[]>;
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
    // add typing here for the props you pass in from transformProps.ts!
  };

export type Category = {
  category: string;
};
