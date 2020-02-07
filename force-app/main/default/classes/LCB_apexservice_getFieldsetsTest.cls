/***********************************************************************
Name:  LCB_apexservice_getFieldsetsTest
======================================================
Purpose:

Unittest Class for: LCB_apexservice_getFieldsets
======================================================
History
Date        AUTHOR                  DETAIL
20/03/2019  Andreas Meyer           INITIAL
********************************************************************** */
@IsTest
private class LCB_apexservice_getFieldsetsTest {

    static testMethod void test_getFieldSetMember() {

        // get the first fieldSet for Account
        Map<String, Schema.FieldSet> mapAccountFieldSets = Schema.SObjectType.Account.fieldSets.getMap();
        Set<String> setFieldSetNames = mapAccountFieldSets.keySet();
        String firstName = '';
        for (String name : setFieldSetNames){
            firstName = name;
            break;
        }
        system.debug('First FieldSet Name: ' + firstName);
        if (String.isBlank(firstName)){
            // pass the test
            return;
        }
        
        Test.startTest();
        List<String> listFieldSetMembers = LCB_apexservice_getFieldsets.getFieldSetMember( 'Account', firstName );
        Test.stopTest();

    }
}