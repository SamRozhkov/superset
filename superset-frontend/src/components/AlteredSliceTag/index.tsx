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
import { useEffect, useMemo, useState, FC } from 'react';
import { isEmpty } from 'lodash';
import { t } from '@superset-ui/core';
import getControlsForVizType from 'src/utils/getControlsForVizType';
import {
  Label,
  Icons,
  Tooltip,
  ModalTrigger,
  TableView,
} from '@superset-ui/core/components';
import type { AlteredSliceTagProps, ControlMap, RowType } from './types';
import { getRowsFromDiffs } from './utils';

export const AlteredSliceTag: FC<AlteredSliceTagProps> = props => {
  const [rows, setRows] = useState<RowType[]>([]);
  const [hasDiffs, setHasDiffs] = useState<boolean>(false);

  useEffect(() => {
    const controlsMap = getControlsForVizType(
      props.origFormData?.viz_type,
    ) as ControlMap;

    setRows(getRowsFromDiffs(props.diffs, controlsMap));
    setHasDiffs(!isEmpty(props.diffs));
  }, [props.diffs, props.origFormData?.viz_type]);

<<<<<<< HEAD
  UNSAFE_componentWillReceiveProps(newProps: AlteredSliceTagProps): void {
    if (isEqual(this.props, newProps)) {
      return;
    }
    const diffs = this.getDiffs(newProps);
    this.setState(prevState => ({
      rows: this.getRowsFromDiffs(diffs, prevState.controlsMap),
      hasDiffs: !isEmpty(diffs),
    }));
  }

  getRowsFromDiffs(
    diffs: { [key: string]: DiffType },
    controlsMap: ControlMap,
  ): RowType[] {
    return Object.entries(diffs).map(([key, diff]) => ({
      control: controlsMap[key]?.label || key,
      before: this.formatValue(diff.before, key, controlsMap),
      after: this.formatValue(diff.after, key, controlsMap),
    }));
  }

  getDiffs(props: AlteredSliceTagProps): { [key: string]: DiffType } {
    const ofd = sanitizeFormData(props.origFormData);
    const cfd = sanitizeFormData(props.currentFormData);
    const fdKeys = Object.keys(cfd);
    const diffs: { [key: string]: DiffType } = {};
    fdKeys.forEach(fdKey => {
      if (!ofd[fdKey] && !cfd[fdKey]) {
        return;
      }
      if (['filters', 'having', 'where'].includes(fdKey)) {
        return;
      }
      if (!this.isEqualish(ofd[fdKey], cfd[fdKey])) {
        diffs[fdKey] = { before: ofd[fdKey], after: cfd[fdKey] };
      }
    });
    return diffs;
  }

  isEqualish(val1: string, val2: string): boolean {
    return isEqual(alterForComparison(val1), alterForComparison(val2));
  }

  formatValue(
    value: DiffItemType,
    key: string,
    controlsMap: ControlMap,
  ): string | number {
    if (value === undefined) {
      return 'N/A';
    }
    if (value === null) {
      return 'null';
    }
    if (
      controlsMap[key]?.type === 'AdhocFilterControl' &&
      Array.isArray(value)
    ) {
      if (!value.length) {
        return '[]';
      }
      return value
        .map((v: FilterItemType) => {
          const filterVal =
            v.comparator && v.comparator.constructor === Array
              ? `[${v.comparator.join(', ')}]`
              : v.comparator;
          return `${v.subject} ${v.operator} ${filterVal}`;
        })
        .join(', ');
    }
    if (controlsMap[key]?.type === 'BoundsControl') {
      return `Min: ${value[0]}, Max: ${value[1]}`;
    }
    if (
      controlsMap[key]?.type === 'CollectionControl' &&
      Array.isArray(value)
    ) {
      return value.map(v => safeStringify(v)).join(', ');
    }
    if (controlsMap[key]?.type === 'MetricsControl' && Array.isArray(value)) {
      const formattedValue = value.map((v: FilterItemType) => v?.label ?? v);
      return formattedValue.length ? formattedValue.join(', ') : '[]';
    }
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
    if (Array.isArray(value)) {
      const formattedValue = value.map((v: FilterItemType) => v?.label ?? v);
      return formattedValue.length ? formattedValue.join(', ') : '[]';
    }
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }
    return safeStringify(value);
  }

  renderModalBody(): React.ReactNode {
=======
  const modalBody = useMemo(() => {
>>>>>>> 6.0.0
    const columns = [
      {
        accessor: 'control',
        Header: t('Control'),
        id: 'control',
      },
      {
        accessor: 'before',
        Header: t('Before'),
        id: 'before',
      },
      {
        accessor: 'after',
        Header: t('After'),
        id: 'after',
      },
    ];
    // set the wrap text in the specific columns.
    const columnsForWrapText = ['control', 'before', 'after'];

    return (
      <TableView
        columns={columns}
        data={rows}
        pageSize={50}
        className="table-condensed"
        columnsForWrapText={columnsForWrapText}
      />
    );
  }, [rows]);

  const triggerNode = useMemo(
    () => (
      <Tooltip id="difference-tooltip" title={t('Click to see difference')}>
        <Label
          icon={<Icons.ExclamationCircleOutlined iconSize="m" />}
          className="label"
          type="warning"
          onClick={() => {}}
        >
          {t('Altered')}
        </Label>
      </Tooltip>
    ),
    [],
  );

  if (!hasDiffs) {
    return null;
  }

  return (
    <ModalTrigger
      triggerNode={triggerNode}
      modalTitle={t('Chart changes')}
      modalBody={modalBody}
      responsive
    />
  );
};

export type { AlteredSliceTagProps };
