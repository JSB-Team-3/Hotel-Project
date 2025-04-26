export interface ChartDataType  {
  [key: string]: number;
};

export interface DonutChartProps  {
  data: ChartDataType;
  height?: number;
  width?: number;
};

export interface UserRoleData {
  user: number;
  admin: number;
}

export interface UserRingChartProps {
  title: string;
  data?: UserRoleData; 
}
