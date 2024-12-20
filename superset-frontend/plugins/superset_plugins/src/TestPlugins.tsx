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
import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import { GanttChart } from 'smart-webcomponents-react/ganttchart';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import { TestPluginsProps, TestPluginsStylesProps } from './types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<TestPluginsStylesProps>`
	.label {
		color: black;
		font-weght: bold;
	}
	.smart-timeline-task-fill {
		border-radius: 5px;
	}

	#--smart-gantt-chart-task-color: red;

	.smart-gantt-chart .task .smart-timeline-task-fill {
		border-radius: 5px;
	}
`;

//<a href="https://www.htmlelements.com/" id="watermark" style="position: absolute; right: 5px; bottom: 5px; color: rgb(255, 255, 255); padding: 20px; border-radius: 5px; background: rgb(12, 61, 120); cursor: pointer; z-index: 999999; display: block; font-size: 24px; text-decoration: none; font-weight: bold; opacity: 1; transition: opacity 0.35s ease-in-out;">https://www.htmlelements.com/</a>
/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function TestPlugins(props: TestPluginsProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width } = props;

  const rootElem = createRef<HTMLDivElement>();

  const treeSize = '30%';
	const durationUnit = 'hour';

	const taskColumns = [{
		label: 'Tasks',
		value: 'label',
		size: '100%'
	}
	];

	const dataSource = [
		{
			label: 'Project 1',
			dateStart: '2023-03-10T12:30:00',
			dateEnd: '2024-06-10T3:59:00',
			type: 'project',
			expanded: true,
			connections: [
				{
					target: 1,
					type: 0,
					lag: 2 * 24 * 60 * 60 * 1000 //2 days lag
				}
			],
			tasks: [
				{
					label: 'Task 1.1',
					dateStart: '2023-02-10',
					dateEnd: '2024-01-10',
					type: 'task',
					connections: [
						{
							target: 2,
							type: 1,
							lag: -5 * 24 * 60 * 60 * 1000 // -5 days lag
						},
						{
							target: 4,
							type: 1
						}
					]
				},
				{
					label: 'Task 1.2',
					dateStart: '2023-10-10',
					dateEnd: '2024-2-31',
					type: 'task',
					connections: [
						{
							target: 3,
							type: 1,
							lag: 15 * 24 * 60 * 60 * 1000 // 15 days lag
						}
					]
				}
			]
		},
		{
			label: 'Task 2',
			dateStart: '2023-03-10T15:30:00',
			dateEnd: '2024-08-10',
			type: 'task'
		},
		{
			label: 'Milestone 1',
			dateEnd: '2024-05-24',
			type: 'milestone',
			connections: [
				{
					target: 5,
					type: 1,
					lag: 5 * 24 * 60 * 60 * 1000 //5 days lag
				}
			]
		},
		{
			label: 'Task 3',
			dateStart: '2024-02-05',
			dateEnd: '2024-07-08',
			progress: 0,
			type: 'task'
		}
	];


  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  });

  console.log('Plugin props', props);

  return (
    <Styles height={0} width={0} headerFontSize={'s'} boldText={false}>
      <GanttChart
        view="month"
        locale="ru"
        dataSource={dataSource}
        taskColumns={taskColumns}
        treeSize={150}
        durationUnit={durationUnit}
        id="gantt"
        disableSegmentDrag
        disableTaskDrag
      />
    </Styles>
  );
}
