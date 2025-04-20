
    export type getAllChartParams = {
      pageSize: number;
      pageNumber: number;
    };
    export type Chart= {
      id: string;
    };
    export type chartState = {
    chartData: Chart | null; 
    loading: boolean;
    error: string | null;
    }

