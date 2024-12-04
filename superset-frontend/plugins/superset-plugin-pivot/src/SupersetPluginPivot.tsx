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
import React, { useEffect, createRef, useLayoutEffect, useState } from 'react';
import { styled } from '@superset-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@webdatarocks/webdatarocks/webdatarocks.css';
import * as WebDataRocksReact from '@webdatarocks/react-webdatarocks';
import {
  SupersetPluginPivotProps,
  SupersetPluginPivotStylesProps,
} from './types';
import { Header } from 'antd/lib/layout/layout';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts
///*background-color: ${({ theme }) => theme.colors.secondary.light2};*/

const Styles = styled.div<SupersetPluginPivotStylesProps>`
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  h3 {
    /* You can use your props to control CSS! */
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) =>
      theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) =>
      theme.typography.weights[boldText ? 'bold' : 'normal']};
  }

  pre {
    height: ${({ theme, headerFontSize, height }) =>
      height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]}px;
  }
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function SupersetPluginPivot(props: SupersetPluginPivotProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, height, width, headerText, pivotSetting, options } = props;

  const report = {
    dataSource: {
      data,
    },
    ...pivotSetting,
  };

  const customizeToolbar = (toolbar: any) => {
    const tabs: any = toolbar.getTabs();
    // eslint-disable-next-line no-param-reassign
    toolbar.getTabs = function () {
      delete tabs[0];
      delete tabs[1];
      delete tabs[2];
      //delete tabs[3];
      //delete tabs[4];
      //delete tabs[5];
      //delete tabs[6];
      //delete tabs[7];
      //delete tabs[8];
      return tabs;
    };
  };

  const rootElem = createRef<HTMLDivElement>();

  useEffect(() => {
    rootElem.current?.webdatarocks.setReport(report);
    rootElem.current?.webdatarocks.setOptions({ ...options });
    rootElem.current?.webdatarocks.refresh();
  }, [options]);

  useEffect(() => {
    //rootElem.current?.webdatarocks.getData({}, function (data) {
    //  console.log(data);
    //}, function(data) {console.log(data)});

   // rootElem.current?.webdatarocks.setReport(report);
  }, [data]);
  // // Often, you just want to access the DOM and do whatever you want.
  // // Here, you can do that with createRef, and the useEffect hook.
  // useLayoutEffect(() => {
  //   const root = rootElem.current as HTMLDivElement;
  //   return () => {
  //     const options = root.webdatarocks?.getOptions();

  //     console.log(options);
  //   };
  // }, [width, height]);

  console.log('Plugin props', props);

  //

  return (
    <Styles
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      <h3>{headerText}</h3>
      <WebDataRocksReact.Pivot
        ref={rootElem}
        width="100%"
        height="100%"
        toolbar
        beforetoolbarcreated={customizeToolbar}
        options={options}
        report={report}
      />
    </Styles>
  );
}
