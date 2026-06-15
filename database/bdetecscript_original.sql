DROP DATABASE IF EXISTS laboratorio_game;
DROP DATABASE IF EXISTS laboratorio_game;

CREATE DATABASE laboratorio_game
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE laboratorio_game;

-- =====================================================
-- TABELA: turmas
-- Guarda as turmas dos alunos.
-- Exemplo: 1º Química A, 1º Química B
-- =====================================================
CREATE TABLE turmas (
    id_turma INT AUTO_INCREMENT PRIMARY KEY,
    nome_turma VARCHAR(100) NOT NULL,
    ano_letivo YEAR NOT NULL,
    ativa BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: usuarios
-- Guarda alunos e professores.
-- O campo tipo_usuario diferencia o perfil.
-- =====================================================
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('aluno', 'professor') NOT NULL,
    id_turma INT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario_turma
        FOREIGN KEY (id_turma)
        REFERENCES turmas(id_turma)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- =====================================================
-- TABELA: modos_jogo
-- Guarda os modos/níveis do jogo.
-- Exemplo: Modo 1 - Fácil, Modo 2 - Médio
-- =====================================================
CREATE TABLE modos_jogo (
    id_modo INT AUTO_INCREMENT PRIMARY KEY,
    nome_modo VARCHAR(50) NOT NULL,
    descricao VARCHAR(255),
    nivel INT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- TABELA: perguntas
-- Guarda as perguntas cadastradas pelo professor.
-- Pode ter imagem e diferentes tipos de pergunta.
-- =====================================================
CREATE TABLE perguntas (
    id_pergunta INT AUTO_INCREMENT PRIMARY KEY,
    id_modo INT NOT NULL,
    id_professor_criador INT NULL,
    enunciado VARCHAR(255) NOT NULL,
    imagem_url VARCHAR(255) NULL,
    tipo_pergunta ENUM('identificacao', 'multipla_escolha', 'associacao') DEFAULT 'multipla_escolha',
    resposta_correta_texto VARCHAR(255) NULL,
    pontuacao INT DEFAULT 10,
    ativa BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_pergunta_modo
        FOREIGN KEY (id_modo)
        REFERENCES modos_jogo(id_modo)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_pergunta_professor
        FOREIGN KEY (id_professor_criador)
        REFERENCES usuarios(id_usuario)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- =====================================================
-- TABELA: alternativas
-- Guarda as alternativas de cada pergunta.
-- Pode ter texto, imagem ou os dois.
-- Uma alternativa pode ser marcada como correta.
-- =====================================================
CREATE TABLE alternativas (
    id_alternativa INT AUTO_INCREMENT PRIMARY KEY,
    id_pergunta INT NOT NULL,
    texto VARCHAR(255) NULL,
    imagem_url VARCHAR(255) NULL,
    correta BOOLEAN DEFAULT FALSE,
    ordem INT DEFAULT 1,

    CONSTRAINT fk_alternativa_pergunta
        FOREIGN KEY (id_pergunta)
        REFERENCES perguntas(id_pergunta)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =====================================================
-- TABELA: dicas
-- Guarda dicas textuais para perguntas.
-- Exemplo: "Esse material é usado em filtração simples."
-- =====================================================
CREATE TABLE dicas (
    id_dica INT AUTO_INCREMENT PRIMARY KEY,
    id_pergunta INT NOT NULL,
    texto_dica VARCHAR(255) NOT NULL,

    CONSTRAINT fk_dica_pergunta
        FOREIGN KEY (id_pergunta)
        REFERENCES perguntas(id_pergunta)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =====================================================
-- TABELA: partidas
-- Guarda cada partida realizada por um aluno.
-- Serve para desempenho e ranking.
-- =====================================================
CREATE TABLE partidas (
    id_partida INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_modo INT NOT NULL,
    pontuacao_total INT DEFAULT 0,
    quantidade_acertos INT DEFAULT 0,
    quantidade_erros INT DEFAULT 0,
    total_perguntas INT DEFAULT 0,
    data_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_fim DATETIME NULL,
    status_partida ENUM('em_andamento', 'finalizada', 'cancelada') DEFAULT 'em_andamento',

    CONSTRAINT fk_partida_aluno
        FOREIGN KEY (id_aluno)
        REFERENCES usuarios(id_usuario)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_partida_modo
        FOREIGN KEY (id_modo)
        REFERENCES modos_jogo(id_modo)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- =====================================================
-- TABELA: respostas_partida
-- Guarda cada resposta dada pelo aluno durante uma partida.
-- Permite saber quais perguntas ele acertou/errou.
-- =====================================================
CREATE TABLE respostas_partida (
    id_resposta_partida INT AUTO_INCREMENT PRIMARY KEY,
    id_partida INT NOT NULL,
    id_pergunta INT NOT NULL,
    id_alternativa INT NULL,
    resposta_texto VARCHAR(255) NULL,
    correta BOOLEAN NOT NULL,
    pontos_obtidos INT DEFAULT 0,
    data_resposta DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_resposta_partida
        FOREIGN KEY (id_partida)
        REFERENCES partidas(id_partida)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_resposta_pergunta
        FOREIGN KEY (id_pergunta)
        REFERENCES perguntas(id_pergunta)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_resposta_alternativa
        FOREIGN KEY (id_alternativa)
        REFERENCES alternativas(id_alternativa)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- =====================================================
-- TABELA: ajudas_utilizadas
-- Guarda quando o aluno usa uma ajuda.
-- Exemplo: dica textual ou eliminar alternativas.
-- =====================================================
CREATE TABLE ajudas_utilizadas (
    id_ajuda_utilizada INT AUTO_INCREMENT PRIMARY KEY,
    id_partida INT NOT NULL,
    id_pergunta INT NOT NULL,
    tipo_ajuda ENUM('dica', 'eliminar_alternativas') NOT NULL,
    data_uso DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ajuda_partida
        FOREIGN KEY (id_partida)
        REFERENCES partidas(id_partida)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_ajuda_pergunta
        FOREIGN KEY (id_pergunta)
        REFERENCES perguntas(id_pergunta)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- =====================================================
-- ÍNDICES PARA MELHORAR CONSULTAS
-- =====================================================
CREATE INDEX idx_usuarios_tipo ON usuarios(tipo_usuario);
CREATE INDEX idx_perguntas_modo ON perguntas(id_modo);
CREATE INDEX idx_partidas_aluno ON partidas(id_aluno);
CREATE INDEX idx_partidas_modo ON partidas(id_modo);
CREATE INDEX idx_respostas_partida ON respostas_partida(id_partida);