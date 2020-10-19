public with sharing class LWCRegistrationController {
    public LWCRegistrationController() {

    }

    @AuraEnabled
    public static List<Test_LWC_Metadata__mdt> getMetadatarecords(){
        System.debug('dfjhsd');
        List<Test_LWC_Metadata__mdt> mtdata = [Select id,Field_API_Name__c,Field_Type__c,Required__c,SObject_API_Name__c,Field_Label__c from Test_LWC_Metadata__mdt];
        System.debug('metadata list'+mtdata);
        return mtdata;
    }

    @AuraEnabled
    public static string TestingMethod(){
        return 'DKHDHFDJFHDFDHF';
    }

    @AuraEnabled
    public static string CreatingData(Account acc){
        System.debug('Account value'+acc);
        insert acc;
        return acc.id;
    }
}
