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

import React, { useEffect, useState } from 'react';
import { styled } from '@superset-ui/core';
import Filter, { FilterProps } from './Filter';

const NativeFilterViewDiv = styled.div``;

// TODO: POC only component can be removed after PR approved

const NativeFilterView = ({ dashboardData }: { dashboardData: any }) => {
  const { nativeFilters, dataMask } = dashboardData;

  const filters: FilterProps[] = [];
  Object.keys(nativeFilters?.filters).forEach((value, index) => {
    filters.push({
      id: value,
      name: nativeFilters?.filters[value].name,
      label:
        nativeFilters?.filters[value]?.filterType !== 'filter_time'
          ? dataMask[value]?.filterState?.label
          : dataMask[value]?.filterState?.value,
      type: nativeFilters?.filters[value].filterType,
      first: /*index === 0*/ true,
      show: nativeFilters?.filters[value]?.showViewFilterControl ,
    });
  });

  const [listFilters, setFilters] = useState<React.JSX.Element[]>([]);

  useEffect(() => {
    const listFilter = filters
      .filter(filter => filter?.label && filter?.show)
      .map(filter => (
        <Filter
          id={filter.id}
          name={filter.name}
          key={filter.id}
          label={filter.label}
          type={filter.type}
          first={filter.first}
        />
      ));

    setFilters(listFilter);
  }, [dataMask, nativeFilters]);

  return <NativeFilterViewDiv>{listFilters}</NativeFilterViewDiv>;
};

export default NativeFilterView;
