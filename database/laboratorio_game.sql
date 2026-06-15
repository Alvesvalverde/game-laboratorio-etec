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
    imagem_url LONGTEXT NULL,
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
    imagem_url LONGTEXT NULL,
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

-- =====================================================
-- DADOS INICIAIS PARA TESTE
-- Login professor: professor@etec.com / 123456
-- Login aluno: aluno@etec.com / 123456
-- =====================================================
INSERT INTO turmas (nome_turma, ano_letivo) VALUES
('1º Química A', YEAR(CURDATE())),
('1º Química B', YEAR(CURDATE())),
('1º Química C', YEAR(CURDATE()));

INSERT INTO modos_jogo (nome_modo, descricao, nivel) VALUES
('Modo 1 - Fácil', 'Identificação de materiais de laboratório', 1),
('Modo 2 - Médio', 'Associação de materiais e sistemas experimentais', 2);

INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario, id_turma) VALUES
('Professor Teste', 'professor@etec.com', '123456', 'professor', NULL),
('Aluno Teste', 'aluno@etec.com', '123456', 'aluno', 1);

INSERT INTO perguntas (id_modo, id_professor_criador, enunciado, imagem_url, tipo_pergunta, resposta_correta_texto, pontuacao) VALUES
(1, 1, 'Qual é o nome deste material de laboratório?', '/icons.svg', 'multipla_escolha', 'Béquer', 10),
(1, 1, 'Qual material é utilizado para medir volume líquido?', '/icons.svg', 'multipla_escolha', 'Proveta', 10),
(1, 1, 'Qual material é usado em filtração simples?', '/icons.svg', 'multipla_escolha', 'Funil', 10),
(2, 1, 'Qual material está associado ao processo de filtração simples?', '/icons.svg', 'associacao', 'Funil', 15),
(2, 1, 'Qual material é utilizado para condensar vapores em uma destilação?', '/icons.svg', 'associacao', 'Condensador', 15);

INSERT INTO alternativas (id_pergunta, texto, correta, ordem) VALUES
(1, 'Béquer', TRUE, 1), (1, 'Proveta', FALSE, 2), (1, 'Funil', FALSE, 3), (1, 'Pipeta', FALSE, 4),
(2, 'Béquer', FALSE, 1), (2, 'Proveta', TRUE, 2), (2, 'Cápsula', FALSE, 3), (2, 'Condensador', FALSE, 4),
(3, 'Bico de Bunsen', FALSE, 1), (3, 'Funil', TRUE, 2), (3, 'Almofariz', FALSE, 3), (3, 'Tela de amianto', FALSE, 4),
(4, 'Funil', TRUE, 1), (4, 'Bico de Bunsen', FALSE, 2), (4, 'Condensador', FALSE, 3), (4, 'Almofariz', FALSE, 4),
(5, 'Proveta', FALSE, 1), (5, 'Funil', FALSE, 2), (5, 'Condensador', TRUE, 3), (5, 'Pipeta', FALSE, 4);

INSERT INTO dicas (id_pergunta, texto_dica) VALUES
(1, 'É usado para misturar, aquecer ou armazenar líquidos.'),
(2, 'Possui marcações laterais para medir volume.'),
(3, 'É usado junto com papel filtro.'),
(4, 'Esse material é usado junto com papel filtro.'),
(5, 'Esse material resfria o vapor e transforma em líquido novamente.');
