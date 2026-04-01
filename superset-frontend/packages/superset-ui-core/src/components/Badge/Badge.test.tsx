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
<<<<<<<< HEAD:superset-frontend/plugins/superset-plugin-pivot/test__/plugin/buildQuery.test.ts
import buildQuery from '../../src/plugin/buildQuery';

describe('SupersetPluginPivot buildQuery', () => {
  const formData = {
    datasource: '5__table',
    granularity_sqla: 'ds',
    series: 'foo',
    viz_type: 'my_chart',
  };

  it('should build groupby with series in form data', () => {
    const queryContext = buildQuery(formData);
    const [query] = queryContext.queries;
    expect(query.columns).toEqual(['foo']);
  });
========
import { render, screen } from '@superset-ui/core/spec';
import { Badge } from '.';

const mockedProps = {
  count: 9,
  text: 'Text',
};

test('should render', () => {
  const { container } = render(<Badge {...mockedProps} />);
  expect(container).toBeInTheDocument();
});

test('should render the count', () => {
  render(<Badge {...mockedProps} />);
  expect(screen.getAllByText('9')[0]).toBeInTheDocument();
});

test('should render the text', () => {
  render(<Badge {...mockedProps} />);
  expect(screen.getByText('Text')).toBeInTheDocument();
>>>>>>>> 6.0.0:superset-frontend/packages/superset-ui-core/src/components/Badge/Badge.test.tsx
});
