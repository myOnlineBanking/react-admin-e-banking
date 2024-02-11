import { CARD_URL } from ".";
import http from "../http-common";

class CardService {
  getCardsByAccountId = async (accountId) => {
    const { data, error } = await http.get(
      `${CARD_URL}getAccountCards?accountId=${accountId}`
    );
    return { data, error };
  };

  enableOrDisableCard = async ({ id, action }) => {
    const { data, error } = await http.post(`${CARD_URL}${action}`, {
      id,
    });
    return { data, error };
  };

  acceptCard = async (cardId) => {
    const { data, error } = await http.put(`${CARD_URL}accept/${cardId}`, {});
    return { data, error };
  };

  getCardsNoAccepted = async () => {
    const { data, error } = await http.get(`${CARD_URL}getNotAcceptable`);
    return { data, error };
  };

  createCard = async (cardInfo) => {
    const { data, error } = await http.post(`${CARD_URL}create`, cardInfo);
     return { data, error };
  };
  updateCard = async (cardInfo) => {  
    const { data, error } = await http.put(`${CARD_URL}update`, cardInfo);
    return { data, error };
  };
}
export default new CardService();
