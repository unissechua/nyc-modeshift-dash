import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import NavBar from './NavBar';
import Map from './Map';
import Legend from './Legend';
import Panel from './Panel';
import Filters from './Filters';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      select: 'origin',
      zone: '',
      feature: '',
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleZoneChange = this.handleZoneChange.bind(this);
    this.handleFeatureChange = this.handleFeatureChange.bind(this);
  }

  handleSelectChange(event) {
    console.log(event.target.value);
    this.setState({
      select: event.target.value,
    });
  }

  handleZoneChange(event) {
    console.log(event.target.value);
    this.setState({
      zone: event.target.value,
    });
  }

  handleFeatureChange(event) {
    console.log(event.target.value);
    this.setState({
      feature: event.target.value,
    });
  }

  render() {
    const { select, zone, feature } = this.state;

    return (
      <div>
        <NavBar />
        <Map select={select} zone={zone} feature={feature} />
        <Filters
          select={select}
          zone={zone}
          feature={feature}
          handleSelectChange={this.handleSelectChange}
          handleZoneChange={this.handleZoneChange}
          handleFeatureChange={this.handleFeatureChange}
        />
        <Legend feature={feature} />
        <Panel select={select} zone={zone} />
      </div>
    );
  }
}


export default withTheme()(App);
