import { MainDrawer } from '../../components/MainDrawer/MainDrawer';
import { Header } from '../../components/Header/Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../utils/Enums/Routes';
import { MainPage } from '../MainPage/MainPage';
import React from 'react';
import { Layout } from 'antd';
import { v4 as uuidv4 } from 'uuid';

export const AppLayout = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <MainDrawer />
    <Layout>
      <Header text="PLN Asset Management System" />
      <Switch>
        <Redirect exact from="/" to={Routes.VEHICLES.REPORT.fuelHistory.path} />
        {Object.values(Routes.VEHICLES.REPORT).map(route => (
          <Route {...route} key={uuidv4()} render={() => <MainPage>{route.comp}</MainPage>} />
        ))}
        {Object.values(Routes.PEOPLE).map(route => (
          <Route {...route} key={uuidv4()} render={() => <MainPage>{route.comp}</MainPage>} />
        ))}
      </Switch>
    </Layout>
  </Layout>
);
