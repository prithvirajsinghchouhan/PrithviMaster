public with sharing class ShowChartController {
    public ShowChartController() {

    }

    public class ChartData{
        public ChartData()
        {

        }
        @AuraEnabled public String Citylabel;
        @AuraEnabled public Integer CityCount;
    }

    @AuraEnabled
    public static List<ChartData> getChartValues()
    {
        List<ChartData> cdata = new List<ChartData>();
        for(Integer i=0;i<5;i++)
        {
            ChartData c = new ChartData();
            c.Citylabel = 'City'+i;
            c.CityCount = i+10;
            cdata.add(c);
        }
        return cdata;
    }
}
