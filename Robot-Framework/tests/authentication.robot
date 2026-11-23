*** Settings ***
Documentation     Test cases for the Swag Labs login.
...
...               Keywords are imported from the resource file
Resource          ../resources/common_keywords.robot
Test Teardown     Close Browser

*** Test Cases ***

TS-01 Login With Valid Credentials
    Login To Swag Labs
    
    Wait For Elements State    [data-test="shopping-cart-link"]    visible    timeout=10s
    Get Url    contains    /inventory
    Get Element Count    [data-test="error"]    ==    0

TS-02 Login With Invalid Credentials
    Open Swag Labs Login Page
    
    Log To Console    Testing: wrong username | right password
    Fill Text    [data-test="username"]    Wrong_Username
    Fill Text    [data-test="password"]    ${PASSWORD}
    Click        [data-test="login-button"]
    
    ${error_message}=    Get Text    [data-test="error"]
    Should Contain    ${error_message}    Epic sadface: Username and password do not match any user in this service

    Log To Console    Testing: missing username | right password
    Clear Text    [data-test="username"]
    Fill Text    [data-test="password"]    ${PASSWORD}
    Click        [data-test="login-button"]
    
    ${error_message}=    Get Text    [data-test="error"]
    Should Contain    ${error_message}    Epic sadface: Username is required

    Log To Console    Testing: right username | wrong password
    Fill Text    [data-test="username"]    ${USERNAME}
    Fill Text    [data-test="password"]    Wrong_Password
    Click        [data-test="login-button"]
    
    ${error_message}=    Get Text    [data-test="error"]
    Should Contain    ${error_message}    Epic sadface: Username and password do not match any user in this service

    Log To Console    Testing: right username | missing password
    Fill Text    [data-test="username"]    ${USERNAME}
    Clear Text    [data-test="password"]
    Click        [data-test="login-button"]
    
    
    ${error_message}=    Get Text    [data-test="error"]
    Should Contain    ${error_message}    Epic sadface: Password is required

TS-05 Logout Using Menu
    Login To Swag Labs

    Click    [id="react-burger-menu-btn"]
    Click    [id="logout_sidebar_link"]

    Wait For Elements State    [data-test="login-button"]    visible    timeout=10s
    Get Url    ==    ${URL}
    Get Element Count    [data-test="error"]    ==    0


    

