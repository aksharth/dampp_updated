import React, { useState, useEffect, createContext } from 'react';
import { Page, Carousel, MissionItem, MissionItemModal } from '../../components'
import { DemoBalanceContext } from '../../context/demo-accounts'
import { withTranslation, useTranslation } from 'react-i18next';

const request = require("axios");
const MissionPools = (props) => {
    const {t} = useTranslation();
    const [modalState, setModalState] = useState({ isOpen: false });
    const [MissionState, setMissionState] = useState({
        _id: "",
        mission_mint: "",
        title: "",
        max_pool_size: 0,
        duration: 0,
        expected_rewards: 0,
        expected_rewards_coin: "",
        game: "",
        default_image: "",
        description: ""
    });
    const [ArcadeMissions, setArcadeMissions] = useState([{
        _id: "",
        mission_mint: "",
        title: "",
        max_pool_size: 0,
        duration: 0,
        expected_rewards: 0,
        expected_rewards_coin: "",
        game: "",
        default_image: "",
        description: ""
    }])

    const [ArcadeTokenAccounts, setArcadeTokenAccounts] = useState({arcade:0, xarcade:0});
    const [ArcadeRewards, setArcadeRewards] = useState({amount:0});

    async function getMissionPool() {
        const res = await request.get('http://arcade.api.private.aioxperts.com/api/demo/missions')
        console.log("missionPool Data", res.data)
        setArcadeMissions(res.data)
    }

    async function getAccountBalances() {
        const res = await request.get('http://arcade.api.private.aioxperts.com/api/demo/wallet/RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm')
        setArcadeTokenAccounts(res.data)
    }

    async function getRewardBalances() {
        const res = await request.get('http://arcade.api.private.aioxperts.com/api/demo/rewards/RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm')
        setArcadeRewards(res.data)
    }

    const asdf = useEffect(async () => {
        //console.log('startTokenAccountGet');
        await getMissionPool();
        await getAccountBalances();
        await getRewardBalances();
        //   setTokenAccounts(await listOwnedTokenAccounts());
        //console.log('Tokenaccounts: ', tokenAccounts);
        return 0;
    }, []);

    return (
        <Page title={t('pages.mission_pools.html_page_title')}>
            <div className="row">
                <div className="col-12">
                    <Carousel>
                        {ArcadeMissions.map((item, i) => <MissionItem key={i} data={item} actionButton={true} onAction={() => {setModalState({ isOpen: true }); setMissionState(item)}}
                        t={t} />)}
                    </Carousel>
                </div>
            </div>
            <DemoBalanceContext.Provider 
                value={{ ArcadeRewards, ArcadeTokenAccounts, setArcadeRewards, setArcadeTokenAccounts, getAccountBalances }}
            >
                <MissionItemModal  
                    data={MissionState} account={{arcade:ArcadeTokenAccounts.arcade, xarcade:ArcadeTokenAccounts.xarcade, rewards:ArcadeRewards}} 
                    isOpen={modalState.isOpen} 
                    closeModal={() => setModalState({ isOpen: false })} />
            </DemoBalanceContext.Provider>
        </Page>
    );
}

export default withTranslation()(MissionPools);