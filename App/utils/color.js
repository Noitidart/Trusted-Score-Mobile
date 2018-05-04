// @flow

import tinycolor from 'tinycolor2'

import { byRankAsc } from './sort'
import { hashToColor } from './hash'

export const MATERIAL_COLORS = {
    red_500: {
        group: 'red',
        shade: '500',
        hex: '#F44336',
        light: true
    },
    red_50: {
        group: 'red',
        shade: '50',
        hex: '#FFEBEE',
        light: false
    },
    red_100: {
        group: 'red',
        shade: '100',
        hex: '#FFCDD2',
        light: false
    },
    red_200: {
        group: 'red',
        shade: '200',
        hex: '#EF9A9A',
        light: false
    },
    red_300: {
        group: 'red',
        shade: '300',
        hex: '#E57373',
        light: false
    },
    red_400: {
        group: 'red',
        shade: '400',
        hex: '#EF5350',
        light: true
    },
    red_600: {
        group: 'red',
        shade: '600',
        hex: '#E53935',
        light: true
    },
    red_700: {
        group: 'red',
        shade: '700',
        hex: '#D32F2F',
        light: true
    },
    red_800: {
        group: 'red',
        shade: '800',
        hex: '#C62828',
        light: true
    },
    red_900: {
        group: 'red',
        shade: '900',
        hex: '#B71C1C',
        light: true
    },
    red_a100: {
        group: 'red',
        shade: 'a100',
        hex: '#FF8A80',
        light: false
    },
    red_a200: {
        group: 'red',
        shade: 'a200',
        hex: '#FF5252',
        light: true
    },
    red_a400: {
        group: 'red',
        shade: 'a400',
        hex: '#FF1744',
        light: true
    },
    red_a700: {
        group: 'red',
        shade: 'a700',
        hex: '#D50000',
        light: true
    },
    pink_500: {
        group: 'pink',
        shade: '500',
        hex: '#E91E63',
        light: true
    },
    pink_50: {
        group: 'pink',
        shade: '50',
        hex: '#FCE4EC',
        light: false
    },
    pink_100: {
        group: 'pink',
        shade: '100',
        hex: '#F8BBD0',
        light: false
    },
    pink_200: {
        group: 'pink',
        shade: '200',
        hex: '#F48FB1',
        light: false
    },
    pink_300: {
        group: 'pink',
        shade: '300',
        hex: '#F06292',
        light: false
    },
    pink_400: {
        group: 'pink',
        shade: '400',
        hex: '#EC407A',
        light: true
    },
    pink_600: {
        group: 'pink',
        shade: '600',
        hex: '#D81B60',
        light: true
    },
    pink_700: {
        group: 'pink',
        shade: '700',
        hex: '#C2185B',
        light: true
    },
    pink_800: {
        group: 'pink',
        shade: '800',
        hex: '#AD1457',
        light: true
    },
    pink_900: {
        group: 'pink',
        shade: '900',
        hex: '#880E4F',
        light: true
    },
    pink_a100: {
        group: 'pink',
        shade: 'a100',
        hex: '#FF80AB',
        light: false
    },
    pink_a200: {
        group: 'pink',
        shade: 'a200',
        hex: '#FF4081',
        light: true
    },
    pink_a400: {
        group: 'pink',
        shade: 'a400',
        hex: '#F50057',
        light: true
    },
    pink_a700: {
        group: 'pink',
        shade: 'a700',
        hex: '#C51162',
        light: true
    },
    purple_500: {
        group: 'purple',
        shade: '500',
        hex: '#9C27B0',
        light: true
    },
    purple_50: {
        group: 'purple',
        shade: '50',
        hex: '#F3E5F5',
        light: false
    },
    purple_100: {
        group: 'purple',
        shade: '100',
        hex: '#E1BEE7',
        light: false
    },
    purple_200: {
        group: 'purple',
        shade: '200',
        hex: '#CE93D8',
        light: false
    },
    purple_300: {
        group: 'purple',
        shade: '300',
        hex: '#BA68C8',
        light: true
    },
    purple_400: {
        group: 'purple',
        shade: '400',
        hex: '#AB47BC',
        light: true
    },
    purple_600: {
        group: 'purple',
        shade: '600',
        hex: '#8E24AA',
        light: true
    },
    purple_700: {
        group: 'purple',
        shade: '700',
        hex: '#7B1FA2',
        light: true
    },
    purple_800: {
        group: 'purple',
        shade: '800',
        hex: '#6A1B9A',
        light: true
    },
    purple_900: {
        group: 'purple',
        shade: '900',
        hex: '#4A148C',
        light: true
    },
    purple_a100: {
        group: 'purple',
        shade: 'a100',
        hex: '#EA80FC',
        light: false
    },
    purple_a200: {
        group: 'purple',
        shade: 'a200',
        hex: '#E040FB',
        light: true
    },
    purple_a400: {
        group: 'purple',
        shade: 'a400',
        hex: '#D500F9',
        light: true
    },
    purple_a700: {
        group: 'purple',
        shade: 'a700',
        hex: '#AA00FF',
        light: true
    },
    deep_purple_500: {
        group: 'deep purple',
        shade: '500',
        hex: '#673AB7',
        light: true
    },
    deep_purple_50: {
        group: 'deep purple',
        shade: '50',
        hex: '#EDE7F6',
        light: false
    },
    deep_purple_100: {
        group: 'deep purple',
        shade: '100',
        hex: '#D1C4E9',
        light: false
    },
    deep_purple_200: {
        group: 'deep purple',
        shade: '200',
        hex: '#B39DDB',
        light: false
    },
    deep_purple_300: {
        group: 'deep purple',
        shade: '300',
        hex: '#9575CD',
        light: true
    },
    deep_purple_400: {
        group: 'deep purple',
        shade: '400',
        hex: '#7E57C2',
        light: true
    },
    deep_purple_600: {
        group: 'deep purple',
        shade: '600',
        hex: '#5E35B1',
        light: true
    },
    deep_purple_700: {
        group: 'deep purple',
        shade: '700',
        hex: '#512DA8',
        light: true
    },
    deep_purple_800: {
        group: 'deep purple',
        shade: '800',
        hex: '#4527A0',
        light: true
    },
    deep_purple_900: {
        group: 'deep purple',
        shade: '900',
        hex: '#311B92',
        light: true
    },
    deep_purple_a100: {
        group: 'deep purple',
        shade: 'a100',
        hex: '#B388FF',
        light: false
    },
    deep_purple_a200: {
        group: 'deep purple',
        shade: 'a200',
        hex: '#7C4DFF',
        light: true
    },
    deep_purple_a400: {
        group: 'deep purple',
        shade: 'a400',
        hex: '#651FFF',
        light: true
    },
    deep_purple_a700: {
        group: 'deep purple',
        shade: 'a700',
        hex: '#6200EA',
        light: true
    },
    indigo_500: {
        group: 'indigo',
        shade: '500',
        hex: '#3F51B5',
        light: true
    },
    indigo_50: {
        group: 'indigo',
        shade: '50',
        hex: '#E8EAF6',
        light: false
    },
    indigo_100: {
        group: 'indigo',
        shade: '100',
        hex: '#C5CAE9',
        light: false
    },
    indigo_200: {
        group: 'indigo',
        shade: '200',
        hex: '#9FA8DA',
        light: false
    },
    indigo_300: {
        group: 'indigo',
        shade: '300',
        hex: '#7986CB',
        light: true
    },
    indigo_400: {
        group: 'indigo',
        shade: '400',
        hex: '#5C6BC0',
        light: true
    },
    indigo_600: {
        group: 'indigo',
        shade: '600',
        hex: '#3949AB',
        light: true
    },
    indigo_700: {
        group: 'indigo',
        shade: '700',
        hex: '#303F9F',
        light: true
    },
    indigo_800: {
        group: 'indigo',
        shade: '800',
        hex: '#283593',
        light: true
    },
    indigo_900: {
        group: 'indigo',
        shade: '900',
        hex: '#1A237E',
        light: true
    },
    indigo_a100: {
        group: 'indigo',
        shade: 'a100',
        hex: '#8C9EFF',
        light: false
    },
    indigo_a200: {
        group: 'indigo',
        shade: 'a200',
        hex: '#536DFE',
        light: true
    },
    indigo_a400: {
        group: 'indigo',
        shade: 'a400',
        hex: '#3D5AFE',
        light: true
    },
    indigo_a700: {
        group: 'indigo',
        shade: 'a700',
        hex: '#304FFE',
        light: true
    },
    blue_500: {
        group: 'blue',
        shade: '500',
        hex: '#2196F3',
        light: false
    },
    blue_50: {
        group: 'blue',
        shade: '50',
        hex: '#E3F2FD',
        light: false
    },
    blue_100: {
        group: 'blue',
        shade: '100',
        hex: '#BBDEFB',
        light: false
    },
    blue_200: {
        group: 'blue',
        shade: '200',
        hex: '#90CAF9',
        light: false
    },
    blue_300: {
        group: 'blue',
        shade: '300',
        hex: '#64B5F6',
        light: false
    },
    blue_400: {
        group: 'blue',
        shade: '400',
        hex: '#42A5F5',
        light: false
    },
    blue_600: {
        group: 'blue',
        shade: '600',
        hex: '#1E88E5',
        light: true
    },
    blue_700: {
        group: 'blue',
        shade: '700',
        hex: '#1976D2',
        light: true
    },
    blue_800: {
        group: 'blue',
        shade: '800',
        hex: '#1565C0',
        light: true
    },
    blue_900: {
        group: 'blue',
        shade: '900',
        hex: '#0D47A1',
        light: true
    },
    blue_a100: {
        group: 'blue',
        shade: 'a100',
        hex: '#82B1FF',
        light: false
    },
    blue_a200: {
        group: 'blue',
        shade: 'a200',
        hex: '#448AFF',
        light: true
    },
    blue_a400: {
        group: 'blue',
        shade: 'a400',
        hex: '#2979FF',
        light: true
    },
    blue_a700: {
        group: 'blue',
        shade: 'a700',
        hex: '#2962FF',
        light: true
    },
    light_blue_500: {
        group: 'light blue',
        shade: '500',
        hex: '#03A9F4',
        light: false
    },
    light_blue_50: {
        group: 'light blue',
        shade: '50',
        hex: '#E1F5FE',
        light: false
    },
    light_blue_100: {
        group: 'light blue',
        shade: '100',
        hex: '#B3E5FC',
        light: false
    },
    light_blue_200: {
        group: 'light blue',
        shade: '200',
        hex: '#81D4FA',
        light: false
    },
    light_blue_300: {
        group: 'light blue',
        shade: '300',
        hex: '#4FC3F7',
        light: false
    },
    light_blue_400: {
        group: 'light blue',
        shade: '400',
        hex: '#29B6F6',
        light: false
    },
    light_blue_600: {
        group: 'light blue',
        shade: '600',
        hex: '#039BE5',
        light: false
    },
    light_blue_700: {
        group: 'light blue',
        shade: '700',
        hex: '#0288D1',
        light: true
    },
    light_blue_800: {
        group: 'light blue',
        shade: '800',
        hex: '#0277BD',
        light: true
    },
    light_blue_900: {
        group: 'light blue',
        shade: '900',
        hex: '#01579B',
        light: true
    },
    light_blue_a100: {
        group: 'light blue',
        shade: 'a100',
        hex: '#80D8FF',
        light: false
    },
    light_blue_a200: {
        group: 'light blue',
        shade: 'a200',
        hex: '#40C4FF',
        light: false
    },
    light_blue_a400: {
        group: 'light blue',
        shade: 'a400',
        hex: '#00B0FF',
        light: false
    },
    light_blue_a700: {
        group: 'light blue',
        shade: 'a700',
        hex: '#0091EA',
        light: true
    },
    cyan_500: {
        group: 'cyan',
        shade: '500',
        hex: '#00BCD4',
        light: false
    },
    cyan_50: {
        group: 'cyan',
        shade: '50',
        hex: '#E0F7FA',
        light: false
    },
    cyan_100: {
        group: 'cyan',
        shade: '100',
        hex: '#B2EBF2',
        light: false
    },
    cyan_200: {
        group: 'cyan',
        shade: '200',
        hex: '#80DEEA',
        light: false
    },
    cyan_300: {
        group: 'cyan',
        shade: '300',
        hex: '#4DD0E1',
        light: false
    },
    cyan_400: {
        group: 'cyan',
        shade: '400',
        hex: '#26C6DA',
        light: false
    },
    cyan_600: {
        group: 'cyan',
        shade: '600',
        hex: '#00ACC1',
        light: false
    },
    cyan_700: {
        group: 'cyan',
        shade: '700',
        hex: '#0097A7',
        light: true
    },
    cyan_800: {
        group: 'cyan',
        shade: '800',
        hex: '#00838F',
        light: true
    },
    cyan_900: {
        group: 'cyan',
        shade: '900',
        hex: '#006064',
        light: true
    },
    cyan_a100: {
        group: 'cyan',
        shade: 'a100',
        hex: '#84FFFF',
        light: false
    },
    cyan_a200: {
        group: 'cyan',
        shade: 'a200',
        hex: '#18FFFF',
        light: false
    },
    cyan_a400: {
        group: 'cyan',
        shade: 'a400',
        hex: '#00E5FF',
        light: false
    },
    cyan_a700: {
        group: 'cyan',
        shade: 'a700',
        hex: '#00B8D4',
        light: false
    },
    teal_500: {
        group: 'teal',
        shade: '500',
        hex: '#009688',
        light: true
    },
    teal_50: {
        group: 'teal',
        shade: '50',
        hex: '#E0F2F1',
        light: false
    },
    teal_100: {
        group: 'teal',
        shade: '100',
        hex: '#B2DFDB',
        light: false
    },
    teal_200: {
        group: 'teal',
        shade: '200',
        hex: '#80CBC4',
        light: false
    },
    teal_300: {
        group: 'teal',
        shade: '300',
        hex: '#4DB6AC',
        light: false
    },
    teal_400: {
        group: 'teal',
        shade: '400',
        hex: '#26A69A',
        light: false
    },
    teal_600: {
        group: 'teal',
        shade: '600',
        hex: '#00897B',
        light: true
    },
    teal_700: {
        group: 'teal',
        shade: '700',
        hex: '#00796B',
        light: true
    },
    teal_800: {
        group: 'teal',
        shade: '800',
        hex: '#00695C',
        light: true
    },
    teal_900: {
        group: 'teal',
        shade: '900',
        hex: '#004D40',
        light: true
    },
    teal_a100: {
        group: 'teal',
        shade: 'a100',
        hex: '#A7FFEB',
        light: false
    },
    teal_a200: {
        group: 'teal',
        shade: 'a200',
        hex: '#64FFDA',
        light: false
    },
    teal_a400: {
        group: 'teal',
        shade: 'a400',
        hex: '#1DE9B6',
        light: false
    },
    teal_a700: {
        group: 'teal',
        shade: 'a700',
        hex: '#00BFA5',
        light: false
    },
    green_500: {
        group: 'green',
        shade: '500',
        hex: '#4CAF50',
        light: false
    },
    green_50: {
        group: 'green',
        shade: '50',
        hex: '#E8F5E9',
        light: false
    },
    green_100: {
        group: 'green',
        shade: '100',
        hex: '#C8E6C9',
        light: false
    },
    green_200: {
        group: 'green',
        shade: '200',
        hex: '#A5D6A7',
        light: false
    },
    green_300: {
        group: 'green',
        shade: '300',
        hex: '#81C784',
        light: false
    },
    green_400: {
        group: 'green',
        shade: '400',
        hex: '#66BB6A',
        light: false
    },
    green_600: {
        group: 'green',
        shade: '600',
        hex: '#43A047',
        light: true
    },
    green_700: {
        group: 'green',
        shade: '700',
        hex: '#388E3C',
        light: true
    },
    green_800: {
        group: 'green',
        shade: '800',
        hex: '#2E7D32',
        light: true
    },
    green_900: {
        group: 'green',
        shade: '900',
        hex: '#1B5E20',
        light: true
    },
    green_a100: {
        group: 'green',
        shade: 'a100',
        hex: '#B9F6CA',
        light: false
    },
    green_a200: {
        group: 'green',
        shade: 'a200',
        hex: '#69F0AE',
        light: false
    },
    green_a400: {
        group: 'green',
        shade: 'a400',
        hex: '#00E676',
        light: false
    },
    green_a700: {
        group: 'green',
        shade: 'a700',
        hex: '#00C853',
        light: false
    },
    light_green_500: {
        group: 'light green',
        shade: '500',
        hex: '#8BC34A',
        light: false
    },
    light_green_50: {
        group: 'light green',
        shade: '50',
        hex: '#F1F8E9',
        light: false
    },
    light_green_100: {
        group: 'light green',
        shade: '100',
        hex: '#DCEDC8',
        light: false
    },
    light_green_200: {
        group: 'light green',
        shade: '200',
        hex: '#C5E1A5',
        light: false
    },
    light_green_300: {
        group: 'light green',
        shade: '300',
        hex: '#AED581',
        light: false
    },
    light_green_400: {
        group: 'light green',
        shade: '400',
        hex: '#9CCC65',
        light: false
    },
    light_green_600: {
        group: 'light green',
        shade: '600',
        hex: '#7CB342',
        light: false
    },
    light_green_700: {
        group: 'light green',
        shade: '700',
        hex: '#689F38',
        light: false
    },
    light_green_800: {
        group: 'light green',
        shade: '800',
        hex: '#558B2F',
        light: true
    },
    light_green_900: {
        group: 'light green',
        shade: '900',
        hex: '#33691E',
        light: true
    },
    light_green_a100: {
        group: 'light green',
        shade: 'a100',
        hex: '#CCFF90',
        light: false
    },
    light_green_a200: {
        group: 'light green',
        shade: 'a200',
        hex: '#B2FF59',
        light: false
    },
    light_green_a400: {
        group: 'light green',
        shade: 'a400',
        hex: '#76FF03',
        light: false
    },
    light_green_a700: {
        group: 'light green',
        shade: 'a700',
        hex: '#64DD17',
        light: false
    },
    lime_500: {
        group: 'lime',
        shade: '500',
        hex: '#CDDC39',
        light: false
    },
    lime_50: {
        group: 'lime',
        shade: '50',
        hex: '#F9FBE7',
        light: false
    },
    lime_100: {
        group: 'lime',
        shade: '100',
        hex: '#F0F4C3',
        light: false
    },
    lime_200: {
        group: 'lime',
        shade: '200',
        hex: '#E6EE9C',
        light: false
    },
    lime_300: {
        group: 'lime',
        shade: '300',
        hex: '#DCE775',
        light: false
    },
    lime_400: {
        group: 'lime',
        shade: '400',
        hex: '#D4E157',
        light: false
    },
    lime_600: {
        group: 'lime',
        shade: '600',
        hex: '#C0CA33',
        light: false
    },
    lime_700: {
        group: 'lime',
        shade: '700',
        hex: '#AFB42B',
        light: false
    },
    lime_800: {
        group: 'lime',
        shade: '800',
        hex: '#9E9D24',
        light: false
    },
    lime_900: {
        group: 'lime',
        shade: '900',
        hex: '#827717',
        light: true
    },
    lime_a100: {
        group: 'lime',
        shade: 'a100',
        hex: '#F4FF81',
        light: false
    },
    lime_a200: {
        group: 'lime',
        shade: 'a200',
        hex: '#EEFF41',
        light: false
    },
    lime_a400: {
        group: 'lime',
        shade: 'a400',
        hex: '#C6FF00',
        light: false
    },
    lime_a700: {
        group: 'lime',
        shade: 'a700',
        hex: '#AEEA00',
        light: false
    },
    yellow_500: {
        group: 'yellow',
        shade: '500',
        hex: '#FFEB3B',
        light: false
    },
    yellow_50: {
        group: 'yellow',
        shade: '50',
        hex: '#FFFDE7',
        light: false
    },
    yellow_100: {
        group: 'yellow',
        shade: '100',
        hex: '#FFF9C4',
        light: false
    },
    yellow_200: {
        group: 'yellow',
        shade: '200',
        hex: '#FFF59D',
        light: false
    },
    yellow_300: {
        group: 'yellow',
        shade: '300',
        hex: '#FFF176',
        light: false
    },
    yellow_400: {
        group: 'yellow',
        shade: '400',
        hex: '#FFEE58',
        light: false
    },
    yellow_600: {
        group: 'yellow',
        shade: '600',
        hex: '#FDD835',
        light: false
    },
    yellow_700: {
        group: 'yellow',
        shade: '700',
        hex: '#FBC02D',
        light: false
    },
    yellow_800: {
        group: 'yellow',
        shade: '800',
        hex: '#F9A825',
        light: false
    },
    yellow_900: {
        group: 'yellow',
        shade: '900',
        hex: '#F57F17',
        light: false
    },
    yellow_a100: {
        group: 'yellow',
        shade: 'a100',
        hex: '#FFFF8D',
        light: false
    },
    yellow_a200: {
        group: 'yellow',
        shade: 'a200',
        hex: '#FFFF00',
        light: false
    },
    yellow_a400: {
        group: 'yellow',
        shade: 'a400',
        hex: '#FFEA00',
        light: false
    },
    yellow_a700: {
        group: 'yellow',
        shade: 'a700',
        hex: '#FFD600',
        light: false
    },
    amber_500: {
        group: 'amber',
        shade: '500',
        hex: '#FFC107',
        light: false
    },
    amber_50: {
        group: 'amber',
        shade: '50',
        hex: '#FFF8E1',
        light: false
    },
    amber_100: {
        group: 'amber',
        shade: '100',
        hex: '#FFECB3',
        light: false
    },
    amber_200: {
        group: 'amber',
        shade: '200',
        hex: '#FFE082',
        light: false
    },
    amber_300: {
        group: 'amber',
        shade: '300',
        hex: '#FFD54F',
        light: false
    },
    amber_400: {
        group: 'amber',
        shade: '400',
        hex: '#FFCA28',
        light: false
    },
    amber_600: {
        group: 'amber',
        shade: '600',
        hex: '#FFB300',
        light: false
    },
    amber_700: {
        group: 'amber',
        shade: '700',
        hex: '#FFA000',
        light: false
    },
    amber_800: {
        group: 'amber',
        shade: '800',
        hex: '#FF8F00',
        light: false
    },
    amber_900: {
        group: 'amber',
        shade: '900',
        hex: '#FF6F00',
        light: false
    },
    amber_a100: {
        group: 'amber',
        shade: 'a100',
        hex: '#FFE57F',
        light: false
    },
    amber_a200: {
        group: 'amber',
        shade: 'a200',
        hex: '#FFD740',
        light: false
    },
    amber_a400: {
        group: 'amber',
        shade: 'a400',
        hex: '#FFC400',
        light: false
    },
    amber_a700: {
        group: 'amber',
        shade: 'a700',
        hex: '#FFAB00',
        light: false
    },
    orange_500: {
        group: 'orange',
        shade: '500',
        hex: '#FF9800',
        light: false
    },
    orange_50: {
        group: 'orange',
        shade: '50',
        hex: '#FFF3E0',
        light: false
    },
    orange_100: {
        group: 'orange',
        shade: '100',
        hex: '#FFE0B2',
        light: false
    },
    orange_200: {
        group: 'orange',
        shade: '200',
        hex: '#FFCC80',
        light: false
    },
    orange_300: {
        group: 'orange',
        shade: '300',
        hex: '#FFB74D',
        light: false
    },
    orange_400: {
        group: 'orange',
        shade: '400',
        hex: '#FFA726',
        light: false
    },
    orange_600: {
        group: 'orange',
        shade: '600',
        hex: '#FB8C00',
        light: false
    },
    orange_700: {
        group: 'orange',
        shade: '700',
        hex: '#F57C00',
        light: false
    },
    orange_800: {
        group: 'orange',
        shade: '800',
        hex: '#EF6C00',
        light: false
    },
    orange_900: {
        group: 'orange',
        shade: '900',
        hex: '#E65100',
        light: true
    },
    orange_a100: {
        group: 'orange',
        shade: 'a100',
        hex: '#FFD180',
        light: false
    },
    orange_a200: {
        group: 'orange',
        shade: 'a200',
        hex: '#FFAB40',
        light: false
    },
    orange_a400: {
        group: 'orange',
        shade: 'a400',
        hex: '#FF9100',
        light: false
    },
    orange_a700: {
        group: 'orange',
        shade: 'a700',
        hex: '#FF6D00',
        light: false
    },
    deep_orange_500: {
        group: 'deep orange',
        shade: '500',
        hex: '#FF5722',
        light: false
    },
    deep_orange_50: {
        group: 'deep orange',
        shade: '50',
        hex: '#FBE9E7',
        light: false
    },
    deep_orange_100: {
        group: 'deep orange',
        shade: '100',
        hex: '#FFCCBC',
        light: false
    },
    deep_orange_200: {
        group: 'deep orange',
        shade: '200',
        hex: '#FFAB91',
        light: false
    },
    deep_orange_300: {
        group: 'deep orange',
        shade: '300',
        hex: '#FF8A65',
        light: false
    },
    deep_orange_400: {
        group: 'deep orange',
        shade: '400',
        hex: '#FF7043',
        light: false
    },
    deep_orange_600: {
        group: 'deep orange',
        shade: '600',
        hex: '#F4511E',
        light: true
    },
    deep_orange_700: {
        group: 'deep orange',
        shade: '700',
        hex: '#E64A19',
        light: true
    },
    deep_orange_800: {
        group: 'deep orange',
        shade: '800',
        hex: '#D84315',
        light: true
    },
    deep_orange_900: {
        group: 'deep orange',
        shade: '900',
        hex: '#BF360C',
        light: true
    },
    deep_orange_a100: {
        group: 'deep orange',
        shade: 'a100',
        hex: '#FF9E80',
        light: false
    },
    deep_orange_a200: {
        group: 'deep orange',
        shade: 'a200',
        hex: '#FF6E40',
        light: false
    },
    deep_orange_a400: {
        group: 'deep orange',
        shade: 'a400',
        hex: '#FF3D00',
        light: true
    },
    deep_orange_a700: {
        group: 'deep orange',
        shade: 'a700',
        hex: '#DD2C00',
        light: true
    },
    brown_500: {
        group: 'brown',
        shade: '500',
        hex: '#795548',
        light: true
    },
    brown_50: {
        group: 'brown',
        shade: '50',
        hex: '#EFEBE9',
        light: false
    },
    brown_100: {
        group: 'brown',
        shade: '100',
        hex: '#D7CCC8',
        light: false
    },
    brown_200: {
        group: 'brown',
        shade: '200',
        hex: '#BCAAA4',
        light: false
    },
    brown_300: {
        group: 'brown',
        shade: '300',
        hex: '#A1887F',
        light: true
    },
    brown_400: {
        group: 'brown',
        shade: '400',
        hex: '#8D6E63',
        light: true
    },
    brown_600: {
        group: 'brown',
        shade: '600',
        hex: '#6D4C41',
        light: true
    },
    brown_700: {
        group: 'brown',
        shade: '700',
        hex: '#5D4037',
        light: true
    },
    brown_800: {
        group: 'brown',
        shade: '800',
        hex: '#4E342E',
        light: true
    },
    brown_900: {
        group: 'brown',
        shade: '900',
        hex: '#3E2723',
        light: true
    },
    grey_500: {
        group: 'grey',
        shade: '500',
        hex: '#9E9E9E',
        light: false
    },
    grey_50: {
        group: 'grey',
        shade: '50',
        hex: '#FAFAFA',
        light: false
    },
    grey_100: {
        group: 'grey',
        shade: '100',
        hex: '#F5F5F5',
        light: false
    },
    grey_200: {
        group: 'grey',
        shade: '200',
        hex: '#EEEEEE',
        light: false
    },
    grey_300: {
        group: 'grey',
        shade: '300',
        hex: '#E0E0E0',
        light: false
    },
    grey_400: {
        group: 'grey',
        shade: '400',
        hex: '#BDBDBD',
        light: false
    },
    grey_600: {
        group: 'grey',
        shade: '600',
        hex: '#757575',
        light: true
    },
    grey_700: {
        group: 'grey',
        shade: '700',
        hex: '#616161',
        light: true
    },
    grey_800: {
        group: 'grey',
        shade: '800',
        hex: '#424242',
        light: true
    },
    grey_900: {
        group: 'grey',
        shade: '900',
        hex: '#212121',
        light: true
    },
    blue_grey_500: {
        group: 'blue grey',
        shade: '500',
        hex: '#607D8B',
        light: true
    },
    blue_grey_50: {
        group: 'blue grey',
        shade: '50',
        hex: '#ECEFF1',
        light: false
    },
    blue_grey_100: {
        group: 'blue grey',
        shade: '100',
        hex: '#CFD8DC',
        light: false
    },
    blue_grey_200: {
        group: 'blue grey',
        shade: '200',
        hex: '#B0BEC5',
        light: false
    },
    blue_grey_300: {
        group: 'blue grey',
        shade: '300',
        hex: '#90A4AE',
        light: false
    },
    blue_grey_400: {
        group: 'blue grey',
        shade: '400',
        hex: '#78909C',
        light: true
    },
    blue_grey_600: {
        group: 'blue grey',
        shade: '600',
        hex: '#546E7A',
        light: true
    },
    blue_grey_700: {
        group: 'blue grey',
        shade: '700',
        hex: '#455A64',
        light: true
    },
    blue_grey_800: {
        group: 'blue grey',
        shade: '800',
        hex: '#37474F',
        light: true
    },
    blue_grey_900: {
        group: 'blue grey',
        shade: '900',
        hex: '#263238',
        light: true
    },
    black: {
        group: 'black',
        shade: 'black',
        hex: '#000000',
        light: true
    },
    white: {
        group: 'white',
        shade: 'white',
        hex: '#FFFFFF',
        light: false
    }
}

type MaterialColor = {|
    group: string,
    shade: string,
    hex: string,
    light: boolean // if the text should be white or black // light means white
|}

type FilterMaterialColorsOptions = {|
    excludeGroups?: $PropertyType<MaterialColor, 'group'>[],
    onlyShades?: $PropertyType<MaterialColor, 'shade'>[]
|}
export function filterMaterialColors({ excludeGroups, onlyShades }: FilterMaterialColorsOptions = {}): MaterialColor[] {
    return Object.values(MATERIAL_COLORS).filter((materialColor: MaterialColor) => {
        if (excludeGroups && excludeGroups.includes(materialColor.group)) return false;
        if (onlyShades && !onlyShades.includes(materialColor.shade)) return false;
        return true;
    });
}

export function findClosestMaterialColor(color: Color, options?: FilterMaterialColorsOptions): MaterialColor {

    const materialColors = filterMaterialColors(options);

    const rankedMaterialColors: {|
        materialColor: MaterialColor,
        rank: number
    |}[] = [];

    for (const materialColor of materialColors) {
        rankedMaterialColors.push({
            materialColor,
            rank: tinycolor.readability(color, materialColor.hex)
        });
    }

    rankedMaterialColors.sort(byRankAsc);

    return rankedMaterialColors[0].materialColor;
}
