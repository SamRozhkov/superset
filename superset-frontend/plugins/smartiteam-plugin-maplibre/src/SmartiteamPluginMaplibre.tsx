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
import React, { useEffect, createRef, useState } from 'react';
import { styled } from '@superset-ui/core';
import {
  SmartiteamPluginMaplibreProps,
  SmartiteamPluginMaplibreStylesProps,
} from './types';

import { Map, Source, Layer, Popup } from '@vis.gl/react-maplibre';
import type { MapLayerMouseEvent } from '@vis.gl/react-maplibre';
import type { FeatureCollection } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';

import bbox from '@turf/bbox';
import centroid from '@turf/centroid';
import Item from 'antd/lib/list/Item';

// import ControlPanel from './control-panel';
// import MAP_STYLE from './map-style';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<SmartiteamPluginMaplibreStylesProps>`
  background-color: ${({ theme }) => theme.colors.secondary.light2};
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



export default function SmartiteamPluginMaplibre(
  props: SmartiteamPluginMaplibreProps,
) {
  console.log(12, 'mapStyleUrl:', props);
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width, mapStyleUrl } = props;
  const [mapInstance, setMapInstance] = useState<any>(null);
  const rootElem = createRef<HTMLDivElement>();
  const [hoverInfo, setHoverInfo] = useState<{lng: number, lat: number, description: string} | null>(null);

  // Смена стиля карты при изменении mapStyleUrl
  useEffect(() => {
    if (mapInstance && mapStyleUrl) {
      try {
        mapInstance.setStyle(mapStyleUrl);
      } catch (e) {
        console.error('Ошибка при смене стиля карты:', e);
      }
    }
  }, [mapInstance, mapStyleUrl]);

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  // useEffect(() => {
  //   const root = rootElem.current as HTMLElement;
  //   console.log('Plugin element', root);
  // });

  console.log('Plugin props', props.data);

  const geojson: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [122.4, 37.8] },
        properties: {description: 'description'}
      },
    ],
  };

  // console.log('item.geodata', JSON.parse(props.data[1].geodata));
  // console.log('item.geodata', props.data[1].geodata);
  // const featureCollections = props.data.map(item => {
  //   return JSON.parse(item.geodata) //.properties.description = item.description;
  // });

  // const featureCollections = [props.data[1].geodata];


  // console.log('featureCollections', featureCollections[0]);
  // // const featureCollections = [];

  // const mergedGeojson = {
  //   type: "FeatureCollection",
  //   features: featureCollections.map(fc => fc.features),
  // };
  // console.log('mergedGeojson', mergedGeojson);

  const layerStyle: CircleLayer = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      // Замените на переменную темы, если она доступна, иначе временно оставим цвет
      'circle-color': '#007cbf',
    },
  };

  const onClick = (event: MapLayerMouseEvent) => {
    const feature = event.features?.[0];
    if (feature) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);
      mapInstance?.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 40, duration: 1000 },
      );
    }
  };

  // Обработчик наведения
  const onHover = (event: MapLayerMouseEvent) => {
    const feature = event.features?.[0];
    if (feature) {
      let lng = 0, lat = 0;
      if (feature.geometry.type === 'Point' && Array.isArray((feature.geometry as any).coordinates)) {
        [lng, lat] = (feature.geometry as any).coordinates;
      } else {
        try {
          const center = centroid(feature);
          if (center && Array.isArray(center.geometry.coordinates)) {
            [lng, lat] = center.geometry.coordinates;
          }
        } catch (e) {
          const [minLng, minLat, maxLng, maxLat] = bbox(feature);
          lng = (minLng + maxLng) / 2;
          lat = (minLat + maxLat) / 2;
        }
      }
      setHoverInfo({
        lng,
        lat,
        description: feature.properties?.description || '',
      });
    } else {
      setHoverInfo(null);
    }
  };
    return (
      <Map
        onLoad={e => setMapInstance(e.target)}
        initialViewState={{
          latitude: 37.78,
          longitude: 122.4,
          zoom: 11,
        }}
        style={{ width, height }}
        projection="mercator"
        mapStyle={mapStyleUrl || "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"}
        onClick={onClick}
        onMouseMove={onHover}
        interactiveLayerIds={['point']}
      >
        <Source id="my-data"
        type="geojson"
        data={geojson}
        // data={mergedGeojson}
        >
          <Layer {...layerStyle} />
        </Source>
        {hoverInfo && (
          <Popup longitude={hoverInfo.lng} latitude={hoverInfo.lat} closeButton={false}>
            {hoverInfo.description}
          </Popup>
        )}
      </Map>
    );
}
