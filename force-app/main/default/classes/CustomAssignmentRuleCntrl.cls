public with sharing class CustomAssignmentRuleCntrl {
    public CustomAssignmentRuleCntrl() {

    }

    @AuraEnabled(cacheable=true)
    public static List<String> getAllObjects(){
        List<string> objlst = new List<string>();

        List<EntityDefinition> sobjectList = new list<EntityDefinition>();
        Set<String> keyPrefixSet = new Set<String>{'017','0D5','0TU','02c','1CE','07k','1CE','0D5','017','00I','0j0'};
            sobjectList = [SELECT QualifiedApiName,MasterLabel,NamespacePrefix FROM EntityDefinition WHERE KeyPrefix NOT IN:keyPrefixSet ORDER BY MasterLabel];
        for(EntityDefinition entity: sobjectList){
            if(entity.NamespacePrefix == null){
                objlst.add(entity.QualifiedApiName+'-'+entity.MasterLabel);
            }
        }

        /*for(Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values()){
        String name = objTyp.getDescribe().getName();
        String label = objTyp.getDescribe().getLabel();
        // Exclude all the unwanted Sobjects e.g. History, Share etc..

        if((!name.containsignorecase('history') && !name.containsignorecase('tag')&&
            !name.containsignorecase('share') && !name.containsignorecase('feed')) || 
            name.toLowerCase().right(3) ==  '__c'){      
            SobjectList.add(name+'-'+label);
            System.debug( 'Name : ' + name);
        }

        }*/
        return objlst;
    }

    @AuraEnabled
    public static String createAssignment(Assignment_Rule__c assignmentrecord){
        String mesg ='';
        try{
            insert assignmentrecord;
            return 'Success'+'-'+assignmentrecord.Id;
        }
        Catch(Exception ex)
        {
            System.debug('Error');
            mesg = ex.getMessage();
        }
        return mesg;
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getFieldList(String assignmentid)
    {
        List<String> fieldlst = new List<String>();
        List<Assignment_Rule__c> asignrule = [Select id,name,Object_API_Name__c,Object_Label__c from Assignment_Rule__c where id=:assignmentid];
        if(asignrule.size()>0)
        {
            Map <String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(asignrule[0].Object_API_Name__c).getDescribe().fields.getMap();
            for(Schema.SObjectField sfield : fieldMap.Values())
            {
                schema.describefieldresult dfield = sfield.getDescribe();
                fieldlst.add(asignrule[0].Object_Label__c+':'+dfield.getname()+'-'+asignrule[0].Object_Label__c+':'+dfield.getLabel());
            }
        }
        return fieldlst;
    }

    
    @AuraEnabled(cacheable=true)
    public static List<String> getOperator()
    {
        List<String> options = new List<String>();
        
        Schema.DescribeFieldResult fieldResult =
        Assignment_Rule_Criteria__c.Operator__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        
        for( Schema.PicklistEntry f : ple)
        {
        options.add(f.getLabel()+'-'+f.getValue());
        }       
        return options;
    }

    @AuraEnabled
    public static string createAssignmentCriterias(List<Assignment_Rule_Criteria__c> assignmentcriterialst){
        String mesg ='Error';
        try{
            insert assignmentcriterialst;
            return 'Success';
        }
        Catch(Exception ex)
        {
            System.debug('Error');
            mesg = ex.getMessage();
        }
        return mesg;
    }

    @AuraEnabled(cacheable=true)
    public static List<User> getuserdetails(){
        
        return [Select id,name from User where isActive = true];
        
    }

    @AuraEnabled(cacheable=true)
    public static List<Group> getQueuedetails(){
        
        return  [SELECT Id, Name FROM Group where Type ='Queue'];
    }

    @AuraEnabled(cacheable=true)
    public static List<EmailTemplate> getAllEmailTemplates(){
        return [Select id,name from EmailTemplate where IsActive = true];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<RuleCriteria> getAllCriteriaRecords(String assignmentId)
    {
        List<Assignment_Rule_Criteria__c> assignmentcriteria = [Select id,name,Assignee_Name__c,Email_Template_Id__c,Filter_Sequence__c,Field_Name__c,Operator__c,Filter_Logic__c,Value__c,Assignee_Type__c,Sort_Order__c,Assignee_Id__c,Assignment_Rule__c from Assignment_Rule_Criteria__c where Assignment_Rule__c=:assignmentId order by Sort_Order__c,Filter_Sequence__c];
        Map<String,RuleCriteria> ruleMap = new Map<String,RuleCriteria>();

        for(Assignment_Rule_Criteria__c ar : assignmentcriteria)
        {
            if(ruleMap.containsKey(ar.Sort_Order__c))
            {
                RuleCriteria temprc = ruleMap.get(ar.Sort_Order__c);
                String filterlogic = temprc.Criteria;
                filterlogic = filterlogic.replace(ar.Filter_Sequence__c,ar.Field_Name__c+' '+ar.Operator__c+' '+ar.Value__c);
                temprc.Criteria = filterlogic;
                ruleMap.put(ar.Sort_Order__c,temprc);
            }
            else {
                String filterlogic = ar.Filter_Logic__c;
                filterlogic = filterlogic.replace(ar.Filter_Sequence__c,ar.Field_Name__c+' '+ar.Operator__c+' '+ar.Value__c);
                RuleCriteria rc = new RuleCriteria();
                rc.Order = ar.Sort_Order__c;
                rc.Criteria = filterlogic;
                if(!String.isBlank(ar.Email_Template_Id__c))
                {
                    rc.isEmail = true;
                }
                else {
                    rc.isEmail = false;
                }
                rc.Assignee = ar.Assignee_Name__c;
                ruleMap.put(ar.Sort_Order__c,rc);
            }
        }

        return ruleMap.values();
    }

    @AuraEnabled
    public static Boolean OrderCheck(String sortorder,String assignmentId){
        
        List<Assignment_Rule_Criteria__c> arc = [Select id,name from Assignment_Rule_Criteria__c where Assignment_Rule__c=: assignmentId and Sort_Order__c=:sortorder];
        if(arc.size() > 0)
        {
            return true;
        }
        return false;
    }

    @AuraEnabled
    public static Boolean deleteCriteriaRecords(String sortorder,String assignmentId){
        try{
            List<Assignment_Rule_Criteria__c> arc = [Select id,name from Assignment_Rule_Criteria__c where Assignment_Rule__c=: assignmentId and Sort_Order__c=:sortorder];
        if(arc.size() > 0)
        {
            delete arc;
        }
        /*
        List<Assignment_Rule_Criteria__c> updatelst = new List<Assignment_Rule_Criteria__c>();
        List<Assignment_Rule_Criteria__c> arcupdate = [Select id,name from Assignment_Rule_Criteria__c where Assignment_Rule__c=: assignmentId and Sort_Order__c>:sortorder];
        for(Assignment_Rule_Criteria__c ar :arcupdate)
        {
            ar.Sort_Order__c = ar.Sort_Order__c + 1;
            updatelst.add(ar);
        }
        if(updatelst.size()>0)
        {
            update updatelst;
        }*/
        }
        Catch(Exception ex)
        {
            return false;
        }
        return true;

    }


    public class RuleCriteria{
        @AuraEnabled public String Order;
        @AuraEnabled public String Criteria;
        @AuraEnabled public String Assignee;
        @AuraEnabled public Boolean isEmail;
    }
}