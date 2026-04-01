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
<<<<<<< HEAD
import React from 'react';

=======
>>>>>>> 6.0.0
import {
  columns,
  metrics,
} from 'src/explore/components/DatasourcePanel/fixtures';
<<<<<<< HEAD
import { fireEvent, render, within } from 'spec/helpers/testing-library';
import DatasourcePanelItem from './DatasourcePanelItem';

const mockData = {
  metricSlice: metrics,
  columnSlice: columns,
  totalMetrics: Math.max(metrics.length, 10),
  totalColumns: Math.max(columns.length, 13),
  width: 300,
  showAllMetrics: false,
  onShowAllMetricsChange: jest.fn(),
  showAllColumns: false,
  onShowAllColumnsChange: jest.fn(),
  collapseMetrics: false,
  onCollapseMetricsChange: jest.fn(),
  collapseColumns: false,
  onCollapseColumnsChange: jest.fn(),
  hiddenMetricCount: 0,
  hiddenColumnCount: 0,
};

test('renders each item accordingly', () => {
  const { getByText, getByTestId, rerender, container } = render(
    <DatasourcePanelItem index={0} data={mockData} style={{}} />,
    { useDnd: true },
  );

  expect(getByText('Metrics')).toBeInTheDocument();
  rerender(<DatasourcePanelItem index={1} data={mockData} style={{}} />);
  expect(
    getByText(
      `Showing ${mockData.metricSlice.length} of ${mockData.totalMetrics}`,
    ),
  ).toBeInTheDocument();
  mockData.metricSlice.forEach((metric, metricIndex) => {
    rerender(
      <DatasourcePanelItem
        index={metricIndex + 2}
        data={mockData}
        style={{}}
      />,
    );
    expect(getByTestId('DatasourcePanelDragOption')).toBeInTheDocument();
    expect(
      within(getByTestId('DatasourcePanelDragOption')).getByText(
        metric.metric_name,
      ),
    ).toBeInTheDocument();
  });
  rerender(
    <DatasourcePanelItem
      index={2 + mockData.metricSlice.length}
      data={mockData}
      style={{}}
    />,
  );
  expect(container).toHaveTextContent('');

  const startIndexOfColumnSection = mockData.metricSlice.length + 3;
  rerender(
    <DatasourcePanelItem
      index={startIndexOfColumnSection}
      data={mockData}
      style={{}}
    />,
  );
  expect(getByText('Columns')).toBeInTheDocument();
  rerender(
    <DatasourcePanelItem
      index={startIndexOfColumnSection + 1}
      data={mockData}
      style={{}}
    />,
  );
  expect(
    getByText(
      `Showing ${mockData.columnSlice.length} of ${mockData.totalColumns}`,
    ),
  ).toBeInTheDocument();
  mockData.columnSlice.forEach((column, columnIndex) => {
    rerender(
      <DatasourcePanelItem
        index={startIndexOfColumnSection + columnIndex + 2}
        data={mockData}
        style={{}}
      />,
    );
    expect(getByTestId('DatasourcePanelDragOption')).toBeInTheDocument();
    expect(
      within(getByTestId('DatasourcePanelDragOption')).getByText(
        column.column_name,
      ),
    ).toBeInTheDocument();
  });
});

test('can collapse metrics and columns', () => {
  mockData.onCollapseMetricsChange.mockClear();
  mockData.onCollapseColumnsChange.mockClear();
  const { queryByText, getByRole, rerender } = render(
    <DatasourcePanelItem index={0} data={mockData} style={{}} />,
    { useDnd: true },
  );
  fireEvent.click(getByRole('button'));
  expect(mockData.onCollapseMetricsChange).toBeCalled();
  expect(mockData.onCollapseColumnsChange).not.toBeCalled();

  const startIndexOfColumnSection = mockData.metricSlice.length + 3;
  rerender(
    <DatasourcePanelItem
      index={startIndexOfColumnSection}
      data={mockData}
      style={{}}
    />,
  );
  fireEvent.click(getByRole('button'));
  expect(mockData.onCollapseColumnsChange).toBeCalled();

  rerender(
    <DatasourcePanelItem
      index={1}
      data={{
        ...mockData,
        collapseMetrics: true,
      }}
      style={{}}
    />,
  );
  expect(
    queryByText(
      `Showing ${mockData.metricSlice.length} of ${mockData.totalMetrics}`,
    ),
  ).not.toBeInTheDocument();

  rerender(
    <DatasourcePanelItem
      index={2}
      data={{
        ...mockData,
        collapseMetrics: true,
      }}
      style={{}}
    />,
  );
  expect(queryByText('Columns')).toBeInTheDocument();
});

test('shows ineligible items count', () => {
  const hiddenColumnCount = 3;
  const hiddenMetricCount = 1;
  const dataWithHiddenItems = {
    ...mockData,
    hiddenColumnCount,
    hiddenMetricCount,
  };
  const { getByText, rerender } = render(
    <DatasourcePanelItem index={1} data={dataWithHiddenItems} style={{}} />,
    { useDnd: true },
  );
  expect(
    getByText(`${hiddenMetricCount} ineligible item(s) are hidden`),
  ).toBeInTheDocument();

  const startIndexOfColumnSection = mockData.metricSlice.length + 3;
  rerender(
    <DatasourcePanelItem
      index={startIndexOfColumnSection + 1}
      data={dataWithHiddenItems}
      style={{}}
    />,
  );
  expect(
    getByText(`${hiddenColumnCount} ineligible item(s) are hidden`),
  ).toBeInTheDocument();
=======
import { screen, userEvent, render } from 'spec/helpers/testing-library';
import DatasourcePanelItem, {
  DatasourcePanelItemProps,
} from './DatasourcePanelItem';

const mockData: DatasourcePanelItemProps['data'] = {
  flattenedItems: [
    { type: 'header', depth: 0, folderId: '1', height: 50 },
    ...metrics.map((m, idx) => ({
      type: 'item' as const,
      depth: 0,
      folderId: '1',
      height: 32,
      index: idx,
      item: { ...m, type: 'metric' as const },
    })),
    { type: 'divider', depth: 0, folderId: '1', height: 16 },
    { type: 'header', depth: 0, folderId: '2', height: 50 },
    ...columns.map((m, idx) => ({
      type: 'item' as const,
      depth: 0,
      folderId: '2',
      height: 32,
      index: idx,
      item: { ...m, type: 'column' as const },
    })),
  ],
  folderMap: new Map([
    [
      '1',
      {
        id: '1',
        isCollapsed: false,
        name: 'Metrics',
        items: metrics.map(m => ({ ...m, type: 'metric' })),
        totalItems: metrics.length,
        showingItems: metrics.length,
      },
    ],
    [
      '2',
      {
        id: '2',
        isCollapsed: false,
        name: 'Columns',
        items: columns.map(c => ({ ...c, type: 'column' })),
        totalItems: columns.length,
        showingItems: columns.length,
      },
    ],
  ]),
  width: 300,
  onToggleCollapse: jest.fn(),
  collapsedFolderIds: new Set(),
};

const setup = (data: DatasourcePanelItemProps['data'] = mockData) =>
  render(
    <>
      {data.flattenedItems.map((_, index) => (
        <DatasourcePanelItem index={index} data={data} style={{}} />
      ))}
    </>,
    { useDnd: true },
  );

test('renders each item accordingly', () => {
  setup();
  expect(screen.getByText('Metrics')).toBeInTheDocument();
  expect(screen.getByText('metric_end_certified')).toBeInTheDocument();
  expect(screen.getByText('metric_end')).toBeInTheDocument();

  expect(screen.getByText('Columns')).toBeInTheDocument();
  expect(screen.getByText('bootcamp_attend')).toBeInTheDocument();
  expect(screen.getByText('calc_first_time_dev')).toBeInTheDocument();
  expect(screen.getByText('aaaaaaaaaaa')).toBeInTheDocument();

  expect(screen.getByTestId('datasource-panel-divider')).toBeInTheDocument();
  expect(screen.getAllByTestId('DatasourcePanelDragOption').length).toEqual(5);
});

test('can collapse metrics and columns', () => {
  setup();
  userEvent.click(screen.getAllByRole('button')[0]);
  expect(mockData.onToggleCollapse).toHaveBeenCalled();
>>>>>>> 6.0.0
});
