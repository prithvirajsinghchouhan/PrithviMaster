public with sharing class LWCDynamicTableController {
    public LWCDynamicTableController() {

    }

    @AuraEnabled
    public static Boolean createAccounts(List<Account> acclst){
        Boolean success = false;
        System.debug('acclst '+ acclst);
        try {
            insert acclst;
            success = true;
            System.debug('acclst11 '+acclst);
            
        } catch (Exception ex) {
            System.debug('Error message '+ex.getMessage());
            success = false;
        }
        return success;
    }
}
