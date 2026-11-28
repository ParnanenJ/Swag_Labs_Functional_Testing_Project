*** Settings ***
Documentation     TC-06 Sort Products By Price
Resource          ../resources/common_keywords.robot
Library           Collections
Test Teardown     Close Browser

*** Test Cases ***
TC-06 Sort Products By Price
    [Tags]    medium
    Login To Swag Labs
    Wait For Elements State    [data-test="product-sort-container"]    visible    timeout=10s
    ${original}=    Read Product Values

    FOR    ${option}    ${reverse}    IN    lohi    ${FALSE}    hilo    ${TRUE}
        Select Options By    [data-test="product-sort-container"]    value    ${option}
        ${expected}=    Evaluate    sorted($original, reverse=$reverse)
        ${actual}=    Read Product Values
        Should Be Equal    ${actual}    ${expected}
    END

*** Keywords ***
Read Product Values
    ${elements}=    Get Elements    [data-test="inventory-item-price"]
    ${count}=    Get Length    ${elements}
    Should Be True    $count >= 2
    ${texts}=    Create List
    FOR    ${element}    IN    @{elements}
        ${text}=    Get Text    ${element}
        Append To List    ${texts}    ${text}
    END
    ${prices}=    Evaluate    [float(text.lstrip('$')) for text in $texts]
    RETURN    ${prices}
