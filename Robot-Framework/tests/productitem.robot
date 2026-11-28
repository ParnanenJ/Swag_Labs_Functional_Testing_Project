*** Settings ***
Documentation     Verify the Swag Labs product details page.
Resource          ../resources/common_keywords.robot
Test Teardown     Close Browser

*** Test Cases ***
TC-08 Open Product And Verify Details
    [Tags]    medium
    Login To Swag Labs
    ${product}=    Set Variable    [data-test="inventory-item"] >> nth=0
    Wait For Elements State    ${product}    visible    timeout=10s

    ${name}=    Get Text    ${product} >> [data-test="inventory-item-name"]
    ${description}=    Get Text    ${product} >> [data-test="inventory-item-desc"]
    ${price}=    Get Text    ${product} >> [data-test="inventory-item-price"]
    Should Not Be Empty    ${name}
    Should Not Be Empty    ${description}
    Should Match Regexp    ${price}    ^[$][0-9]+[.][0-9]{2}$

    Click    ${product} >> [data-test="inventory-item-name"]
    Wait For Elements State    [data-test="inventory-item-name"]    visible    timeout=10s
    Get Url    contains    /inventory-item.html?id=
    Get Text    [data-test="inventory-item-name"]    ==    ${name}
    Get Text    [data-test="inventory-item-desc"]    ==    ${description}
    Get Text    [data-test="inventory-item-price"]    ==    ${price}
