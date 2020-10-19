public with sharing class TestingDataFetch {
    public TestingDataFetch() {

    }

    @AuraEnabled
    public static Contact getContactData(String conId){
        return [Select id,name,Email,Phone from Contact where Id =:conId];
    }
}
