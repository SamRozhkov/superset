/*
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
<<<<<<<< HEAD:superset-frontend/packages/superset-ui-chart-controls/src/components/ControlSubSectionHeader.tsx
import { styled } from '@superset-ui/core';

export const ControlSubSectionHeader = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-size: ${({ theme }) => theme.typography.sizes.s};
  margin-bottom: ${({ theme }) => theme.gridUnit}px;
`;
export default ControlSubSectionHeader;
========

import { t } from '../translation';

/**
 * Validate a [Mapbox styles URL](https://docs.mapbox.com/help/glossary/style-url/)
 * @param v
 */
export default function validateMapboxStylesUrl(v: unknown) {
  if (
    typeof v === 'string' &&
    v.trim().length > 0 &&
    v.trim().startsWith('mapbox://styles/')
  ) {
    return false;
  }

  return t('is expected to be a Mapbox URL');
}
>>>>>>>> 3.1.1:superset-frontend/packages/superset-ui-core/src/validator/validateMapboxStylesUrl.ts
