#!/bin/bash

VENV_NAME=".venv"

echo "--- Configurando o Ambiente Virtual Python ---"

if [ ! -d "$VENV_NAME" ]; then
    echo "Criando o ambiente virtual '$VENV_NAME'..."
    python3 -m venv $VENV_NAME
else
    echo "Ambiente virtual '$VENV_NAME' já existe."
fi

source $VENV_NAME/bin/activate
echo "Ambiente virtual ativado. (.venv)"

if [ -f "requirements.txt" ]; then
    echo "Instalando dependências do requirements.txt..."
    pip install -r requirements.txt
    echo "Instalação concluída com sucesso."
else
    echo "AVISO: requirements.txt não encontrado. Nenhuma dependência instalada."
fi

echo "------------------------------------------------"
echo "Para começar a trabalhar, o ambiente está ATIVO."
echo "Para desativar, digite 'deactivate'."