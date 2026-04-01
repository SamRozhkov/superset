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
import React, { CSSProperties } from 'react';
import { css, Metric, styled, t, useTheme } from '@superset-ui/core';

import Icons from 'src/components/Icons';
import DatasourcePanelDragOption from './DatasourcePanelDragOption';
import { DndItemType } from '../DndItemType';
import { DndItemValue } from './types';

export type DataSourcePanelColumn = {
  is_dttm?: boolean | null;
  description?: string | null;
  expression?: string | null;
  is_certified?: number | null;
  column_name?: string | null;
  name?: string | null;
  type?: string;
};

type Props = {
  index: number;
  style: CSSProperties;
  data: {
    metricSlice: Metric[];
    columnSlice: DataSourcePanelColumn[];
    totalMetrics: number;
    totalColumns: number;
    width: number;
    showAllMetrics: boolean;
    onShowAllMetricsChange: (showAll: boolean) => void;
    showAllColumns: boolean;
    onShowAllColumnsChange: (showAll: boolean) => void;
    collapseMetrics: boolean;
    onCollapseMetricsChange: (collapse: boolean) => void;
    collapseColumns: boolean;
    onCollapseColumnsChange: (collapse: boolean) => void;
    hiddenMetricCount: number;
    hiddenColumnCount: number;
  };
};

export const DEFAULT_MAX_COLUMNS_LENGTH = 50;
export const DEFAULT_MAX_METRICS_LENGTH = 50;
export const ITEM_HEIGHT = 30;

const Button = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.primary.dark1};
`;

const ButtonContainer = styled.div`
  text-align: center;
  padding-top: 2px;
`;

const LabelWrapper = styled.div`
  ${({ theme }) => css`
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${theme.typography.sizes.s}px;
    background-color: ${theme.colors.grayscale.light4};
    margin: ${theme.gridUnit * 2}px 0;
    border-radius: 4px;
    padding: 0 ${theme.gridUnit}px;
=======
import { CSSProperties, ReactNode, useCallback } from 'react';

import {
  css,
  styled,
  t,
  useCSSTextTruncation,
  useTheme,
} from '@superset-ui/core';

import { Icons } from '@superset-ui/core/components/Icons';
import { Tooltip } from '@superset-ui/core/components/Tooltip';
import { Typography } from '@superset-ui/core/components';
import DatasourcePanelDragOption from './DatasourcePanelDragOption';
import { DndItemType } from '../DndItemType';
import { DndItemValue, FlattenedItem, Folder } from './types';

const LabelWrapper = styled.div`
  ${({ theme }) => css`
    color: ${theme.colorText};
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${theme.fontSizeSM}px;
    background-color: ${theme.colorBgTextActive};
    margin: ${theme.sizeUnit * 2}px 0;
    border-radius: ${theme.borderRadius}px;
    padding: 0 ${theme.sizeUnit}px;
>>>>>>> 6.0.0

    &:first-of-type {
      margin-top: 0;
    }
    &:last-of-type {
      margin-bottom: 0;
    }

    padding: 0;
<<<<<<< HEAD
    cursor: pointer;
    &:hover {
      background-color: ${theme.colors.grayscale.light3};
=======
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
    &:hover {
      background-color: ${theme.colorBgTextHover};
>>>>>>> 6.0.0
    }

    & > span {
      white-space: nowrap;
    }

    .option-label {
      display: inline;
    }

    .metric-option {
      & > svg {
<<<<<<< HEAD
        min-width: ${theme.gridUnit * 4}px;
=======
        min-width: ${theme.sizeUnit * 4}px;
>>>>>>> 6.0.0
      }
      & > .option-label {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  `}
`;

const SectionHeaderButton = styled.button`
<<<<<<< HEAD
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  background: transparent;
  width: 100%;
  padding-inline: 0px;
`;

const SectionHeader = styled.span`
  ${({ theme }) => `
    font-size: ${theme.typography.sizes.m}px;
    line-height: 1.3;
  `}
`;

const Box = styled.div`
  ${({ theme }) => `
    border: 1px ${theme.colors.grayscale.light4} solid;
    border-radius: ${theme.gridUnit}px;
    font-size: ${theme.typography.sizes.s}px;
    padding: ${theme.gridUnit}px;
    color: ${theme.colors.grayscale.light1};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `}
`;

const DatasourcePanelItem: React.FC<Props> = ({ index, style, data }) => {
  const {
    metricSlice: _metricSlice,
    columnSlice,
    totalMetrics,
    totalColumns,
    width,
    showAllMetrics,
    onShowAllMetricsChange,
    showAllColumns,
    onShowAllColumnsChange,
    collapseMetrics,
    onCollapseMetricsChange,
    collapseColumns,
    onCollapseColumnsChange,
    hiddenMetricCount,
    hiddenColumnCount,
  } = data;
  const metricSlice = collapseMetrics ? [] : _metricSlice;

  const EXTRA_LINES = collapseMetrics ? 1 : 2;
  const isColumnSection = collapseMetrics
    ? index >= 1
    : index > metricSlice.length + EXTRA_LINES;
  const HEADER_LINE = isColumnSection
    ? metricSlice.length + EXTRA_LINES + 1
    : 0;
  const SUBTITLE_LINE = HEADER_LINE + 1;
  const BOTTOM_LINE =
    (isColumnSection ? columnSlice.length : metricSlice.length) +
    (collapseMetrics ? HEADER_LINE : SUBTITLE_LINE) +
    1;
  const collapsed = isColumnSection ? collapseColumns : collapseMetrics;
  const setCollapse = isColumnSection
    ? onCollapseColumnsChange
    : onCollapseMetricsChange;
  const showAll = isColumnSection ? showAllColumns : showAllMetrics;
  const setShowAll = isColumnSection
    ? onShowAllColumnsChange
    : onShowAllMetricsChange;
  const theme = useTheme();
  const hiddenCount = isColumnSection ? hiddenColumnCount : hiddenMetricCount;

  return (
    <div
      style={style}
      css={css`
        padding: 0 ${theme.gridUnit * 4}px;
      `}
    >
      {index === HEADER_LINE && (
        <SectionHeaderButton onClick={() => setCollapse(!collapsed)}>
          <SectionHeader>
            {isColumnSection ? t('Columns') : t('Metrics')}
          </SectionHeader>
          {collapsed ? (
            <Icons.DownOutlined iconSize="s" />
          ) : (
            <Icons.UpOutlined iconSize="s" />
          )}
        </SectionHeaderButton>
      )}
      {index === SUBTITLE_LINE && !collapsed && (
        <div
          css={css`
            display: flex;
            gap: ${theme.gridUnit * 2}px;
=======
  border: none;
  background: transparent;
  width: 100%;
  height: 100%;
  padding-inline: 0;
`;

const SectionHeaderTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SectionHeader = styled(Typography.Text)`
  ${({ theme }) => css`
    font-size: ${theme.fontSize}px;
    font-weight: ${theme.fontWeightStrong};
    line-height: 1.3;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

const Divider = styled.div`
  ${({ theme }) => css`
    height: 16px;
    border-bottom: 1px solid ${theme.colorSplit};
  `}
`;

export interface DatasourcePanelItemProps {
  index: number;
  style: CSSProperties;
  data: {
    flattenedItems: FlattenedItem[];
    folderMap: Map<string, Folder>;
    width: number;
    onToggleCollapse: (folderId: string) => void;
    collapsedFolderIds: Set<string>;
  };
}

const DatasourcePanelItem = ({
  index,
  style,
  data,
}: DatasourcePanelItemProps) => {
  const {
    flattenedItems,
    folderMap,
    width,
    onToggleCollapse,
    collapsedFolderIds,
  } = data;
  const item = flattenedItems[index];
  const theme = useTheme();
  const [labelRef, labelIsTruncated] = useCSSTextTruncation<HTMLSpanElement>({
    isVertical: true,
    isHorizontal: false,
  });

  const getTooltipNode = useCallback(
    (folder: Folder) => {
      let tooltipNode: ReactNode | null = null;
      if (labelIsTruncated) {
        tooltipNode = (
          <div>
            <b>{t('Name')}:</b> {folder.name}
          </div>
        );
      }
      if (folder.description) {
        tooltipNode = (
          <div>
            {tooltipNode}
            <div
              css={
                tooltipNode &&
                css`
                  margin-top: ${theme.sizeUnit}px;
                `
              }
            >
              <b>{t('Description')}:</b> {folder.description}
            </div>
          </div>
        );
      }
      return tooltipNode;
    },
    [labelIsTruncated],
  );

  if (!item) return null;

  const folder = folderMap.get(item.folderId);
  if (!folder) return null;

  const indentation = item.depth * theme.sizeUnit * 4;

  return (
    <div
      style={{
        ...style,
        paddingLeft: theme.sizeUnit * 4 + indentation,
        paddingRight: theme.sizeUnit * 4,
      }}
    >
      {item.type === 'header' && (
        <SectionHeaderButton onClick={() => onToggleCollapse(folder.id)}>
          <Tooltip title={getTooltipNode(folder)}>
            <SectionHeaderTextContainer>
              <SectionHeader ref={labelRef}>{folder.name}</SectionHeader>
              {collapsedFolderIds.has(folder.id) ? (
                <Icons.DownOutlined iconSize="s" iconColor={theme.colorText} />
              ) : (
                <Icons.UpOutlined iconSize="s" iconColor={theme.colorText} />
              )}
            </SectionHeaderTextContainer>
          </Tooltip>
        </SectionHeaderButton>
      )}

      {item.type === 'subtitle' && (
        <div
          css={css`
            display: flex;
            gap: ${theme.sizeUnit * 2}px;
>>>>>>> 6.0.0
            justify-content: space-between;
            align-items: baseline;
          `}
        >
          <div
            className="field-length"
            css={css`
              flex-shrink: 0;
            `}
          >
<<<<<<< HEAD
            {isColumnSection
              ? t(`Showing %s of %s`, columnSlice?.length, totalColumns)
              : t(`Showing %s of %s`, metricSlice?.length, totalMetrics)}
          </div>
          {hiddenCount > 0 && (
            <Box>{t(`%s ineligible item(s) are hidden`, hiddenCount)}</Box>
          )}
        </div>
      )}
      {index > SUBTITLE_LINE && index < BOTTOM_LINE && (
        <LabelWrapper
          key={
            (isColumnSection
              ? columnSlice[index - SUBTITLE_LINE - 1].column_name
              : metricSlice[index - SUBTITLE_LINE - 1].metric_name) +
            String(width)
=======
            {t(`Showing %s of %s items`, item.showingItems, item.totalItems)}
          </div>
        </div>
      )}

      {item.type === 'item' && item.item && (
        <LabelWrapper
          key={
            (item.item.type === 'column'
              ? item.item.column_name
              : item.item.metric_name) + String(width)
>>>>>>> 6.0.0
          }
          className="column"
        >
          <DatasourcePanelDragOption
<<<<<<< HEAD
            value={
              isColumnSection
                ? (columnSlice[index - SUBTITLE_LINE - 1] as DndItemValue)
                : metricSlice[index - SUBTITLE_LINE - 1]
            }
            type={isColumnSection ? DndItemType.Column : DndItemType.Metric}
          />
        </LabelWrapper>
      )}
      {index === BOTTOM_LINE &&
        !collapsed &&
        (isColumnSection
          ? totalColumns > DEFAULT_MAX_COLUMNS_LENGTH
          : totalMetrics > DEFAULT_MAX_METRICS_LENGTH) && (
          <ButtonContainer>
            <Button onClick={() => setShowAll(!showAll)}>
              {showAll ? t('Show less...') : t('Show all...')}
            </Button>
          </ButtonContainer>
        )}
=======
            value={item.item as DndItemValue}
            type={
              item.item.type === 'column'
                ? DndItemType.Column
                : DndItemType.Metric
            }
          />
        </LabelWrapper>
      )}

      {item.type === 'divider' && (
        <Divider data-test="datasource-panel-divider" />
      )}
>>>>>>> 6.0.0
    </div>
  );
};

export default DatasourcePanelItem;
