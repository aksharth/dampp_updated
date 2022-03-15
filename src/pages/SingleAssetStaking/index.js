import React, { useState, useRef, useEffect, createRef } from 'react';
import { Page, ExchangeField } from '../../components'
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import StepWizard from "react-step-wizard";
import SAS from '../../components/sas';
import SuccessSwap from '../../components/success-swap-page';
import { DemoBalanceContext } from '../../context/demo-accounts'

const request = require("axios");
const ExchangeDivider = styled.div`
    position:relative;
    padding:0.7rem 0;
    text-align:center;
    button{
        height: 32px;
        width: 32px;
        border-radius: 50%;
        background: #000829;
        cursor: pointer;
        border: 0px;
        color: #fff;
        font-size: 12px;
        svg{
            transform: rotate(90deg);
        }   
    }
`;



const SingleAssetStaking = (props) => {

    const [ArcadeTokenAccounts, setArcadeTokenAccounts] = useState({ arcade: 0, xarcade: 0 });
    async function getAccountBalances() {
        const res = await request.get('http://arcade.api.private.aioxperts.com/api/demo/wallet/RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm')
        setArcadeTokenAccounts(res.data)
    }
    const [currency, setCurrency] = useState({
        from: "ARCADE",
        to: 'xARCADE'
    })
    const [direction, setDirection] = useState(false)
    const [amount, setAmount] = useState(0);
    

    const asdf = useEffect(async () => {
        await getAccountBalances();
        return 0;
    }, []);

    return (
        <Page title="Single Asset Staking">
            <div className='row'>
                <div className='col-sm-6 mx-auto'>
                    <div className='card shadow-widget gradient-card'>
                        <div className='card-body'>
                        <DemoBalanceContext.Provider 
                value={{ ArcadeTokenAccounts, setArcadeTokenAccounts, currency, setCurrency, direction, setDirection, amount, setAmount }}
            >
                            <StepWizard>
                                <SAS />
                                <SuccessSwap />
                            </StepWizard>
                            </DemoBalanceContext.Provider>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default SingleAssetStaking;