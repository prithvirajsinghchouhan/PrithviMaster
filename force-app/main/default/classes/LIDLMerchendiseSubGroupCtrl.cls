public with sharing class LIDLMerchendiseSubGroupCtrl {
    public LIDLMerchendiseSubGroupCtrl() {

    }

    @AuraEnabled
    public static List<Test1__c> fetchProducts(String ProductgroupId){

        //List<Test1__c> productgroup = [Select id,name,Complexity_Point__c from Test1__c where Id=:ProductgroupId];
        List<Test1__c> productgroup = [Select id,name,Complexity_Point__c from Test1__c];
        return productgroup;
    }
}
