import React, { Fragment } from "react";
import Events from './Events';
import About from './About';
import Services from './Services';
import Team from './Team';

const HomePage = () => {
  return (
    <Fragment>
        <Events />
        <About />
        <Services />
        <Team />
    </Fragment>
  );
}

export default HomePage;