import type { Razomy } from '@razomy/abstractions/meta';
import Boolean from './components/input/Boolean.vue';
import Color from './components/input/Color.vue';
import Date from './components/input/Date.vue';
import Enum from './components/input/Enum.vue';
import File from './components/input/File.vue';
import FileArray from './components/input/FileArray.vue';
import JsonString from './components/input/JsonString.vue';
import Number from './components/input/Number.vue';
import NumberArray from './components/input/NumberArray.vue';
import String from './components/input/String.vue';
import StringArray from './components/input/StringArray.vue';
import TextInput from './components/input/TextInput.vue';

import Alert from './components/Alert.vue';
import AppChip from './components/AppChip.vue';
import AppCopyBtn from './components/AppCopyBtn.vue';
import AppSearchInput from './components/AppSearchInput.vue';
import Badge, { BadgeRole, BadgeVariant } from './components/Badge.vue';
import Button from './components/Button.vue';
import Card from './components/Card.vue';
import Container from './components/Container.vue';
import Divider from './components/Divider.vue';
import Grid, {
  GridAlign,
  GridBorder,
  type GridGap,
  type GridPadding,
  GridSurface,
  GridVariant,
} from './components/Grid.vue';
import LogoIcon from './components/LogoIcon.vue';
import StatCard from './components/StatCard.vue';
import Body from './components/typography/Body.vue';
import Text, {TextColor} from './components/typography/Text.vue';
import type {IVfsController, VfsItem, VfsQuery} from './components/vfs/types';
import VfsAside from './components/vfs/VfsAside.vue';
import VfsExplorer from './components/vfs/VfsExplorer.vue';
import VfsNode from './components/vfs/VfsNode.vue';
import VfsPreview from './components/vfs/VfsPreview.vue';
import { cm } from './style/classMerge';

declare global {
  interface Window {
    razomy: Razomy;
    r: Razomy;
  }
}
// @ts-ignore
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    razomy: Razomy;
    r: Razomy;
  }
}

// @ts-ignore
declare module 'vue' {
  interface GlobalComponents {}

  interface ComponentCustomProperties {
    razomy: Razomy;
    r: Razomy;
  }
}

export {
  Boolean,
  Color,
  Date,
  Enum,
  File,
  FileArray,
  JsonString,
  Number,
  NumberArray,
  String,
  StringArray,
  Alert,
  AppChip,
  type BadgeRole,
  type BadgeVariant,
  GridGap,
  type GridPadding,
  type GridBorder,
  type TextColor,
  type GridSurface,
  type GridVariant,
  type GridAlign,
  type IVfsController,
  type VfsItem,
  type VfsQuery,
  AppCopyBtn,
  AppSearchInput,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  LogoIcon,
  StatCard,
  Body,
  Text,
  VfsAside,
  VfsExplorer,
  VfsNode,
  VfsPreview,
  TextInput,
  cm,
};

export default {
  install(app, razomy: Razomy) {
    if (window) {
      window.r = window.razomy = razomy;
    }
    app.config.globalProperties.razomy = razomy;
    app.provide('razomy', razomy);
    app.provide('r', razomy);

    app.component('Boolean', Boolean);
    app.component('Color', Color);
    app.component('Date', Date);
    app.component('Enum', Enum);
    app.component('File', File);
    app.component('FileArray', FileArray);
    app.component('JsonString', JsonString);
    app.component('Number', Number);
    app.component('NumberArray', NumberArray);
    app.component('String', String);
    app.component('StringArray', StringArray);
    app.component('Alert', Alert);
    app.component('AppChip', AppChip);
    app.component('AppCopyBtn', AppCopyBtn);
    app.component('AppSearchInput', AppSearchInput);
    app.component('Badge', Badge);
    app.component('Button', Button);
    app.component('Card', Card);
    app.component('Container', Container);
    app.component('Divider', Divider);
    app.component('Grid', Grid);
    app.component('LogoIcon', LogoIcon);
    app.component('StatCard', StatCard);
    app.component('Body', Body);
    app.component('Text', Text);
    app.component('VfsAside', VfsAside);
    app.component('VfsExplorer', VfsExplorer);
    app.component('VfsNode', VfsNode);
    app.component('VfsPreview', VfsPreview);
  },
};
