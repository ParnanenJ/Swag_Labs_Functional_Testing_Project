*** Settings ***
Documentation     Shared keywords for the Swag Labs inventory page.
Library           Browser
Library           Collections

*** Variables ***
${BASE_URL}       https://www.saucedemo.com
${HEADLESS}       ${TRUE}
${SORT_MENU}      css=select.product_sort_container
${PRODUCT_CARD}   css=.inventory_item
${PRODUCT_NAME}   css=.inventory_item_name
${PRODUCT_PRICE}  css=.inventory_item_price

*** Keywords ***
Open Inventory As Standard User
    New Browser    chromium    headless=${HEADLESS}
    New Page    ${BASE_URL}
    Fill Text    css=#user-name    standard_user
    Fill Text    css=#password    secret_sauce
    Click    css=#login-button
    Wait For Elements State    ${SORT_MENU}    visible

Sort Inventory By
    [Arguments]    ${option}
    Select Options By    ${SORT_MENU}    value    ${option}

Get Inventory Names
    ${names}=    Get Inventory Texts    ${PRODUCT_NAME}
    RETURN    ${names}

Get Inventory Prices
    ${price_texts}=    Get Inventory Texts    ${PRODUCT_PRICE}
    ${prices}=    Evaluate    [float(text.lstrip('$')) for text in $price_texts]
    RETURN    ${prices}

Get Inventory Texts
    [Arguments]    ${selector}
    ${elements}=    Get Elements    ${selector}
    ${count}=    Get Length    ${elements}
    Should Be True    $count >= 2    The inventory needs at least two products for sorting.
    ${texts}=    Create List
    FOR    ${element}    IN    @{elements}
        ${item_text}=    Get Text    ${element}
        Append To List    ${texts}    ${item_text}
    END
    RETURN    ${texts}
