
    export type getAllChartParams = {
      pageSize: number;
      pageNumber: number;
    };
    export type ChartData= {
      rooms: number;
      facilities: number;
      bookings: {
        pending: number;
        completed: number;
      };
      ads: number;
      users: {
        user: number;
        admin: number;
      };
    }
    
    export type chartState = {
    chartData: ChartData | null; 
    loading: boolean;
    error: string | null;
    }

