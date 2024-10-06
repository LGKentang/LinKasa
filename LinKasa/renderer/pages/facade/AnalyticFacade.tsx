enum AnalyticsType {
    SECURITY,
    FINANCIAL,
    INFRASTRUCTURE
}

class DataProcessor {
    private analysisType: AnalyticsType;

    constructor(analysisType: AnalyticsType) {
        this.analysisType = analysisType;
    }

    process(data: string): any {
        switch (this.analysisType) {
            case AnalyticsType.SECURITY:
                return `Processed SECURITY data: ${data}`;
            case AnalyticsType.FINANCIAL:
                return `Processed FINANCIAL data: ${data}`;
            case AnalyticsType.INFRASTRUCTURE:
                return `Processed INFRASTRUCTURE data: ${data}`;
            default:
                return `Processed data: ${data}`;
        }
    }
}

class DataFetcher {
    private analysisType: AnalyticsType;

    constructor(analysisType: AnalyticsType) {
        this.analysisType = analysisType;
    }
    fetch(data : string): any {
        switch (this.analysisType) {
            case AnalyticsType.SECURITY:
                return `Processed SECURITY data: ${data}`;
            case AnalyticsType.FINANCIAL:
                return `Processed FINANCIAL data: ${data}`;
            case AnalyticsType.INFRASTRUCTURE:
                return `Processed INFRASTRUCTURE data: ${data}`;
            default:
                return `Processed data: ${data}`;
        }
    }
}

class ChartRenderer {
    private analysisType: AnalyticsType;

    constructor(analysisType: AnalyticsType) {
        this.analysisType = analysisType;
    }
    
    render(data: AnalyticsType): JSX.Element {
        switch (data) {
            case AnalyticsType.SECURITY:
                return <div></div>;
            case AnalyticsType.FINANCIAL:
                return <div></div>;
            case AnalyticsType.INFRASTRUCTURE:
                return <div></div>;
            default:
                return <div></div>;
        }
    }
}

// Facade
class AnalyticsFacade {
    private dataProcessor: DataProcessor;
    private dataFetcher: DataFetcher;
    private chartRenderer: ChartRenderer;
    private analysisType : AnalyticsType;

    constructor(analysisType : AnalyticsType) {
        this.analysisType  = analysisType;
        this.dataProcessor = new DataProcessor(this.analysisType);
        this.dataFetcher = new DataFetcher(this.analysisType);
        this.chartRenderer = new ChartRenderer(this.analysisType);
    }

    // logic nya
    // fetch, compute, render

    render() : JSX.Element {
        return this.chartRenderer.render(this.analysisType);
    }
}

const analyticsFacade = new AnalyticsFacade(AnalyticsType.SECURITY);
analyticsFacade.render()