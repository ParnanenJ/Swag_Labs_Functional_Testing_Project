*** Settings ***
Documentation     Test cases for Swag Labs checkout
Resource          ../resources/common_keywords.robot
Test Teardown     Close Browser

*** Test Cases ***
TC-11 Submit Checkout Form With Valid Information
    Login To Swag Labs

    Add Product To Cart
    Open Shopping Cart
    Click    [data-test="checkout"]

    Fill Text    [data-test="firstName"]    ${FIRST_NAME}
    Fill Text    [data-test="lastName"]    ${LAST_NAME}
    Fill Text    [data-test="postalCode"]    ${POSTAL_CODE}

    Click    [data-test="continue"]

    ${page_title}=    Get Text    [data-test="title"]
    Should Contain    ${page_title}    Checkout: Overview

TC-12 Submit Checkout Form With Missing Information
    Login To Swag Labs

    Add Product To Cart
    Open Shopping Cart
    Click    [data-test="checkout"]

    Fill Text    [data-test="lastName"]    ${LAST_NAME}
    Fill Text    [data-test="postalCode"]    ${POSTAL_CODE}
    Click    [data-test="continue"]

    ${error_message}=    Get Text    [data-test="error"]
    Should Contain    ${error_message}    First Name is required

    Fill Text    [data-test="firstName"]    ${FIRST_NAME}
    Clear Text    [data-test="lastName"]
    Click    [data-test="continue"]

    ${error_message}=    Get Text    [data-test="error"]
    Should Contain    ${error_message}    Last Name is required

    Fill Text    [data-test="lastName"]    ${LAST_NAME}
    Clear Text    [data-test="postalCode"]
    Click    [data-test="continue"]

    ${error_message}=    Get Text    [data-test="error"]
    Should Contain    ${error_message}    Postal Code is required