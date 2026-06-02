% unisenaiclass.cls - classe simples para artigos UNISENAI
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{unisenaiclass}[2025/05/06 Template UNISENAI Article]

\LoadClass[12pt]{article}

\RequirePackage{titlesec}
\RequirePackage{geometry}
\RequirePackage{fancyhdr}
\RequirePackage{etoolbox}
\RequirePackage{graphicx}
\RequirePackage{caption}
\RequirePackage{ragged2e}

\geometry{a4paper, margin=2.5cm}

\makeatletter

\renewcommand{\familydefault}{\sfdefault}

% Define o comando \subtitle
\newcommand{\subtitle}[1]{\def\@subtitle{#1}}

% Redefine o comando \maketitle
\renewcommand{\maketitle}{%
    \begin{figure}[htbp]
        \centering
    % Logo opcional; se o arquivo não existir, a capa segue sem imagem.
    \IfFileExists{imgs/senai_logo.png}{%
      \includegraphics[width=0.4\textwidth]{imgs/senai_logo.png}\\[0.5em]
    }{%
      \fbox{\parbox{0.4\textwidth}{\centering LOGO SENAI}}\\[0.5em]
    }
        {\large \textbf{\textit{FACULDADE DE TECNOLOGIA SENAI GASPAR RICARDO JÚNIOR}}}
    \end{figure}
    \begin{center}
        {\large \textbf{\@title}}\\[1.5em]
        {\large \textbf{\@subtitle}}\\[1.5em]
    \end{center}
    \begin{flushleft}
        \@author \\\ [1.5em]
    \end{flushleft}
    \@thanks
}

\newenvironment{resumo}{%
  \textbf{RESUMO}\\
  \justifying
}{\par}

\newenvironment{abstract1}{%
  \textbf{ABSTRACT}\\
  \justifying
}{\par}

\endinput
