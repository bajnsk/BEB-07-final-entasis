import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import History from "./History"
const HistoryWrapper =({userPosition,walletConnected,
    setWalletConnected})=>{
    const [currentPageNum, setCurrentPageNum]=useState(1)
    const {chainId, account, active, activate, deactivate} = useWeb3React();


    const handleConnect = () => {
        if(active) {
            deactivate();
            return;
        }
        activate(injected, (error) => {
            if('/No ethereum provider was found on window.ethereum/'.test(error)) {
                window.open('https://metamask.io/download.html');
            }
        });
        setWalletConnected(!walletConnected)
    }
    let positions = userPosition!==undefined&& userPosition!==null?userPosition:[]
    let pageSet = 10;
    let pages = Math.ceil(positions.length/ 10);
    let offset = pageSet * (currentPageNum - 1);
    let limit = offset + pageSet;

    return(
        <div className="history_wrapperA">
            <div className="history_wrapperA_top">
                <h4>History</h4>
                <div className="pagination">
                    <div 
                    onClick={()=>currentPageNum>1?setCurrentPageNum(currentPageNum-1):<></>}
                    className="pagination_btn">
                        {<i className="fas fa-caret-left"></i>}
                    </div>
                    {pages<=10?<div className="pagination_numbers">{Array(pages).fill().map((_,i)=>{<div 
                    onClick={()=>setCurrentPageNum(i+1)}
                    className="pagination_numbers btn">{i+1}</div>})}</div>:
                        <div className="pagination_numbers">
                            <div 
                            onClick={()=>setCurrentPageNum(1)}
                            className="pagination_numbers btn">1</div>
                            <div 
                            onClick={()=>setCurrentPageNum(2)}
                            className="pagination_numbers btn">2</div>
                            <div 
                            onClick={()=>setCurrentPageNum(3)}
                            className="pagination_numbers btn">3</div>
                            <div 
                            className="pagination_numbers btn">···</div>
                            <div 
                            onClick={()=>setCurrentPageNum(Number((pages/2).toFixed(0))-1)}
                            className="pagination_numbers btn">{Number((pages/2).toFixed(0))-1}</div>
                            <div 
                            onClick={()=>setCurrentPageNum(Number((pages/2).toFixed(0)))}
                            className="pagination_numbers btn">{Number((pages/2).toFixed(0))}</div>
                            <div 
                            onClick={()=>setCurrentPageNum(Number((pages/2).toFixed(0))+1)}
                            className="pagination_numbers btn">{Number((pages/2).toFixed(0))+1}</div>
                            <div 
                            className="pagination_numbers btn">···</div>
                            <div 
                            onClick={()=>setCurrentPageNum(pages-2)}
                            className="pagination_numbers btn">{pages-2}</div>
                            <div 
                            onClick={()=>setCurrentPageNum(pages-1)}
                            className="pagination_numbers btn">{pages-1}</div>
                            <div 
                            onClick={()=>setCurrentPageNum(pages)}
                            className="pagination_numbers btn">{pages}</div>
                        </div>
                    }
                    <div 
                    onClick={()=>currentPageNum<pages?setCurrentPageNum(currentPageNum+1):<></>}
                    className="pagination_btn">
                        {<i className="fas fa-caret-right"></i>}
                    </div>
                </div>
                <div 
                    className="btn_m">{pages>0?currentPageNum:0}
                </div>
            </div>
            
            <div className="history_wrapperA_menu">
                <h5>Order</h5>
                <h5>Price</h5>
                <h5>Amount</h5>
                <h5>Fee</h5>
                <h5>Date</h5>
                <h5>From</h5>

            </div>
            <div className="main_history_wrapperA_container">
                {positions!==undefined&&pages>0?[...positions].reverse().slice(offset,limit).map((e)=>{
                    return (<History
                        key={e.id}
                        order = {e.order}
                        price = {e.price}
                        amount = {e.amount}
                        fee = {e.fee}
                        date = {`${e.createdAt}`.slice(0,10)+' '+`${e.createdAt}`.slice(14,19)}
                        company_name={e.company_name}
                    />)
                }):<div className="disconnection_status">
                <h6>Start Trading</h6>
                <h6 className='disconnection_status_login' onClick={handleConnect}>Log In or Sign Up </h6>
                </div>}
            </div>
        </div>
    )
}

export default HistoryWrapper