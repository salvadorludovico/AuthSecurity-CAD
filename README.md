# Iniciar o projeto
1. `npm install`
2. `npm run dev`
3. Certifique-se de ter instalado localmente o mongodb ou colocar uma URI online
4. Use ferramentas como insomnia ou postman para testar os endpoints

### Tecnologias
- express: Framework web.
- bcryptjs: Para criptografar senhas (hashing de senhas e dados sensíveis).
- jsonwebtoken: Para gerar e validar JWT.
- mongoose: ODM para MongoDB.
- dotenv: Gerenciar variáveis de ambiente.

### Docker
Para executar o banco de dados com docker execute
```bash
docker-compose up
```

## Testes
Os testes automatizados para esse projeto estão na pasta tests/
Para executar todos os testes digite o seguinte comando em seu terminal
Cuidado ao escolher o banco utilizado para os testes, pois ele será completamente apagado
```bash
npm run test
```