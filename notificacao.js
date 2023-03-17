(function executeRule(current, previous /*null when async*/) {
  // Define a URL do webhook no Microsoft Teams
  var webhookUrl = "https://outlook.office.com/webhook/...";

  // Define o payload da mensagem que será enviada para o Teams
  var payload = {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "0076D7",
    "summary": "Nova tarefa adicionada!",
    "sections": [
      {
        "activityTitle": "Uma nova tarefa foi adicionada à fila:",
        "activitySubtitle": current.short_description, // Título da tarefa
        "activityText": current.description, // Descrição da tarefa
        "facts": [
          {
            "name": "Prioridade",
            "value": current.priority // Prioridade da tarefa
          },
          {
            "name": "Responsável",
            "value": current.assignment_group.getDisplayValue() // Grupo de atribuição da tarefa
          }
        ]
      }
    ]
  };

  // Faz a chamada ao webhook do Teams para enviar a notificação
  var r = new sn_ws.RESTMessageV2();
  r.setEndpoint(webhookUrl);
  r.setHttpMethod("POST");
  r.setRequestHeader("Content-Type", "application/json");
  r.setRequestBody(JSON.stringify(payload));
  var response = r.execute();

})(current, previous);
