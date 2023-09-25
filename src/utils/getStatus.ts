// @ts-ignore
export const computeDocStatus = (statusId, type) => {
  if (type === "sender") {
    switch (statusId) {
      case 7:
        return "Ожидает подписи доверенного лица";

      case 8:
        return "Ожидает подписи партнёра";

      case 9:
        return "Отклонено дов.лицом";

      case 15:
        return "Ожидает подписи партнёра";

      case 17:
        return "Отменено вами";

      case 20:
        return "Отклонено партнёром";

      case 30:
        return "Принято партнёром";
      case 0:
        return "Сохранен";

      default:
        return "---";
    }
  }
  if (type === "receiver") {
    switch (statusId) {
      case 7:
        return "Ожидает подписи доверенного лица";

      case 8:
        return "Ожидает вашей подписи";

      case 9:
        return "Отклонено дов.лицом";

      case 15:
        return "Ожидает вашей подписи";

      case 17:
        return "Отменено отправителем";

      case 20:
        return "Отклонено вами";

      case 30:
        return "Принято вами";

      default:
        return "---";
    }
  }
  if (type === "agent") {
    switch (statusId) {
      case 7:
        return "Ожидает вашей подписи";

      case 8:
        return "Принято дов. лицом";

      case 9:
        return "Отклонено вами";

      case 15:
        return "Ожидает подписи партнёра";

      case 17:
        return "Отменено отправителем";

      case 20:
        return "Отклонено партнёром";

      case 30:
        return "Принято партнёром";

      default:
        return "---";
    }
  }
};

// @ts-ignore
export const computeStatusColor = (statusId) => {
  const statusColors = {
    7: "primary",
    8: "primary",
    9: "error",
    15: "secondary",
    17: "error",
    20: "warning",
    30: "success",
  };
  // @ts-ignore
  return statusColors[statusId];
};

// @ts-ignore
export const computeContractStatusColor = (clients, sender, userTin) => {
  if (userTin === sender) {
    let accepted = true;
    let rejected = false;

    // @ts-ignore
    clients?.forEach((client) => {
      if (client.status === 20) rejected = true;
      if (client.status === 15) accepted = false;
    });

    if (accepted && !rejected) return "Принято партнёром";

    if (rejected) return "Отклонено партнёром";

    return "Ожидает подписи партнёра";
  }

  if (!clients?.length) return "---";

  // @ts-ignore
  const currentClient = clients.find((client) => client.Tin === userTin);
  if (currentClient === -1 || !currentClient) return "---";

  let allAccepted = true;
  let rejected = false;
  // @ts-ignore
  clients?.forEach((client) => {
    if (client.status === 20) rejected = true;
    if (client.status === 15) allAccepted = false;
  });

  if (rejected) {
    if (currentClient.status === 20) return "Отклонено вами";

    return "Отклонено партнёром";
  }

  if (currentClient.status === 30) return "Принято вами";

  return "Ожидает вашей подписи";
};
