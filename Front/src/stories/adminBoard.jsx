import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Provider } from 'react-redux';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, number, object, boolean, text, select, date, array, color } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import  AntAdminLogin  from '../containers/adminBoard/LoginList/AntAdminLogin'

import  AnimateLogin  from '../containers/adminBoard/LoginList/AnimateLogin'

import  DailyLogin  from '../containers/adminBoard/LoginList/DailyLogin'

import  NormalLogin  from '../containers/adminBoard/LoginList/NormalLogin'

import AntAdminLoginREADME from '../containers/adminBoard/LoginList/AntAdminLogin/README.md'

import AnimateLoginREADME from '../containers/adminBoard/LoginList/AnimateLogin/README.md'

import DailyLoginREADME from '../containers/adminBoard/LoginList/DailyLogin/README.md'


import NormalLoginREADME from '../containers/adminBoard/LoginList/NormalLogin/README.md'


storiesOf('登录注册', module)
.addDecorator(withReadme(AntAdminLoginREADME))
.add('Ant Desgin 登录页面', () => {
  return <AntAdminLogin/>
})

storiesOf('登录注册', module)
.addDecorator(withReadme(AnimateLoginREADME))
.add('Animated 登录页面', () => {
  return <AnimateLogin/>
})

storiesOf('登录注册', module)
.addDecorator(withReadme(DailyLoginREADME))
.add('Daily 登录页面', () => {
  return <DailyLogin/>
})

storiesOf('登录注册', module)
.addDecorator(withReadme(NormalLoginREADME))
.add('Normal 登录页面', () => {
  return <NormalLogin/>
})