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
import { FormatLocaleDefinition } from 'd3-format';

export const DEFAULT_D3_FORMAT: FormatLocaleDefinition = {
  decimal: '.',
  thousands: ',',
  grouping: [3],
  currency: ['$', ''],
};

export interface FormatLocalePrefixies {
  y: string;
  z: string;
  a: string;
  f: string;
  p: string;
  n: string;
  µ: string;
  m: string;
  '': string;
  k: string;
  M: string;
  G: string;
  T: string;
  P: string;
  E: string;
  Z: string;
  Y: string;
}

export const DEFALT_D3_FORMAT_PREFIXIES: FormatLocalePrefixies = {
  y: 'y',
  z: 'z',
  a: 'a',
  f: 'f',
  p: 'p',
  n: 'n',
  µ: 'µ',
  m: 'm',
  '': '',
  k: 'тыс.',
  M: 'млн',
  G: 'млрд',
  T: 'Т',
  P: 'P',
  E: 'E',
  Z: 'Z',
  Y: 'Y',
};
