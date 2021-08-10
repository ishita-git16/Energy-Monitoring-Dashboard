import React from 'react';

 import { Chart } from 'chart.js'

 
export default {
  title: 'Example/Chart',
  component: Chart,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

 const Template = (args) => <Chart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

