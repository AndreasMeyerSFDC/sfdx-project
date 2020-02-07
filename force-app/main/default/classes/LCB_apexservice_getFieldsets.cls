/***********************************************************************
Name:  LCB_apexservice_getFieldsets
======================================================
Purpose:

Apex Controller class for LCB_RecordForm_FieldSet Component
======================================================
History
Date        AUTHOR                  DETAIL
20/03/2019  Andreas Meyer           INITIAL
********************************************************************** */
public class LCB_apexservice_getFieldsets {
    
    @AuraEnabled(cacheable=true) 
    public static List<String> getFieldSetMember(String objectName , String fieldSetName){
        System.debug('FieldsetName--> ' + fieldSetName);
        System.debug('objectName--> ' + objectName);
        List<String> fieldlNameList = new List<String>();
        Schema.SObjectType sObj = Schema.getGlobalDescribe().get(objectName);
        
        for(Schema.FieldSetMember fieldMember : sObj.getDescribe().fieldSets.getMap().get(fieldSetName).getFields()){
            fieldlNameList.add(fieldMember.getFieldPath());          
        }
        System.debug('fieldlNameList--> '+fieldlNameList);
        return fieldlNameList;
    }
}