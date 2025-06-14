import React, { useEffect, useState } from 'react';
import { styled } from '@superset-ui/core';
import { guessFrame } from 'src/explore/components/controls/DateFilterControl/utils/dateFilterUtils';
import rison from 'rison'; 
import { SupersetClient } from '@superset-ui/core';
import { getClientErrorObject } from 'src/utils/getClientErrorObject';
import { timeCompareOperator } from '@superset-ui/chart-controls';

const FilterEl = styled.span``;

const FilterName = styled.span`
  font-weight: bold;
  margin-right: 0.5em;
`;

const FilterLabel = styled.span`
  font-size: 0.9em;
`;

const FilterWrapper = styled.span`
  margin-right: 0.5em;

  &.showArrow {
    :before {
      content: '→';
      margin-right: 0.5em;
      font-size: 1.2em;
    }
  }
`;

export interface FilterProps {
  type: string;
  name: string;
  id: string;
  label: string;
  first: boolean;
  show?: boolean;
}

const SEPARATOR = ' : ';

const buildTimeRangeString = (since: string, until: string): string =>
  `${since}${SEPARATOR}${until}`;

const formatDateEndpoint = (dttm: string, isStart?: boolean): string =>
  dttm.replace('T00:00:00', '') || (isStart ? '-∞' : '∞');

const formatTimeRange = (
  timeRange: string,
  timeRangeType: string,
  columnPlaceholder = 'col',
) => {
  const splitDateRange = timeRange.split(SEPARATOR);
  if (splitDateRange.length === 1) return timeRange;

  const rangeType = guessFrame(timeRangeType);
  
  // выводим текст диапазона только для определенных форматов
  // в остальных случаях как есть
  if (rangeType == 'Calendar' || rangeType == 'Common') {
    return `${timeRangeType} по (${formatDateEndpoint(splitDateRange[1])})`;
  }
  
   return `${formatDateEndpoint(
    splitDateRange[0],
    true,
  )} ≤ ${columnPlaceholder} < ${formatDateEndpoint(splitDateRange[1])}`;
};

const fetchTimeRange = async (
  timeRange: string,
) => {
  const query = rison.encode_uri(timeRange);
  const endpoint = `/api/v1/time_range/?q=${query}`;
  try {
    const response = await SupersetClient.get({ endpoint });
    const timeRangeString = buildTimeRangeString(
      response?.json?.result?.since || '',
      response?.json?.result?.until || '',
    );
    return {
      value: formatTimeRange(timeRangeString, response?.json?.result?.timeRange),
    };
  } catch (response) {
    const clientError = await getClientErrorObject(response);
    return {
      error: clientError.message || clientError.error || response.statusText,
    };
  }
};

const Filter = (props: FilterProps) => {
  const { type, name, id, label, first } = props;

  const [value, setValue] = useState<string | undefined>(label);

  useEffect(() => {
    type === 'filter_time'
      ? fetchTimeRange(label).then(data => setValue(data?.value))
      : setValue(label);
  }, [label]);

  return (
    <FilterEl id={id}>
      <FilterWrapper className={!first ? 'showArrow' : undefined}>
        <FilterName>{name}:</FilterName>
        <FilterLabel>{value}</FilterLabel>
      </FilterWrapper>
    </FilterEl>
  );
};

export default Filter;
