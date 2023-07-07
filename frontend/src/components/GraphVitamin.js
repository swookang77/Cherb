import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { connect } from "react-redux";
// const getIntroOfPage = (text) => {
//   return text;
// };

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].payload.fullname} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

class GraphVitamin extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/tooltip-with-customized-content-lyxvs";

  render() {
    const { totalData } = this.props;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={totalData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="AmountPerServing" barSize={20} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalData: state.total.data,
  };
};

export default connect(mapStateToProps)(GraphVitamin);
