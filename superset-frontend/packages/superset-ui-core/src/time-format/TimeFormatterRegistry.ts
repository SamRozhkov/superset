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

import { TimeLocaleDefinition } from 'd3-time-format';
import { RegistryWithDefaultKey, OverwritePolicy } from '../models';
import TimeFormats, { LOCAL_PREFIX } from './TimeFormats';
import createD3TimeFormatter from './factories/createD3TimeFormatter';
import TimeFormatter from './TimeFormatter';

export default class TimeFormatterRegistry extends RegistryWithDefaultKey<
  TimeFormatter,
  TimeFormatter
> {
  constructor() {
    super({
      initialDefaultKey: TimeFormats.DATABASE_DATETIME,
      name: 'TimeFormatter',
      overwritePolicy: OverwritePolicy.WARN,
    });
  }

  get(format?: string) {
    const targetFormat = `${
      format === null || typeof format === 'undefined' || format === ''
        ? this.defaultKey
        : format
    }`.trim();

    if (this.has(targetFormat)) {
      return super.get(targetFormat) as TimeFormatter;
    }

    // Create new formatter if does not exist
    const useLocalTime = targetFormat.startsWith(LOCAL_PREFIX);
    const formatString = targetFormat.replace(LOCAL_PREFIX, '');

    const defaultLocale: TimeLocaleDefinition = {
      dateTime: '%A, %e %B %Y г. %X',
      date: '%d.%m.%Y',
      time: '%H:%M:%S',
      periods: ['AM', 'PM'],
      days: [
        'воскресенье',
        'понедельник',
        'вторник',
        'среда',
        'четверг',
        'пятница',
        'суббота',
      ],
      shortDays: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
      months: [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ],
      shortMonths: [
        'янв',
        'фев',
        'мар',
        'апр',
        'май',
        'июн',
        'июл',
        'авг',
        'сен',
        'окт',
        'ноя',
        'дек',
      ],
    };

    const formatter = createD3TimeFormatter({
      formatString,
      useLocalTime,
      locale: defaultLocale,
    });
    // const formatter = createD3TimeFormatter({ formatString, useLocalTime });
    this.registerValue(targetFormat, formatter);

    return formatter;
  }

  format(format: string | undefined, value: Date | null | undefined): string {
    return this.get(format)(value);
  }
}
