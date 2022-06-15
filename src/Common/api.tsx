import axios from "axios";
import { BASE_API_URL } from "./constants";
import { AppInitConfig, LoanInfo } from "./interfaces";

const getInitialConfiguration = async (): Promise<AppInitConfig> => {
    const result = await axios.get(BASE_API_URL + "/v1/application/constraints");
    const initialConfiguration = result.data as AppInitConfig;

    return initialConfiguration;
}

const getLoanInfo = async (amount: number, term: number): Promise<LoanInfo> => {
    const result = await axios.get(BASE_API_URL + `/v1/application/real-first-loan-offer?amount=${amount}&term=${term}`);
    const loanInfo = result.data as LoanInfo;

    return loanInfo;
}

export { getInitialConfiguration, getLoanInfo };